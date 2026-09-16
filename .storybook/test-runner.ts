import {
  getStoryContext,
  type TestRunnerConfig,
  waitForPageReady,
} from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

import {
  primaryWebFontFamilies,
  primaryWebFontWeights,
} from "../src/shared/design-system/tokens/font/web-fonts.ts";
import {
  DEFAULT_DETERMINISTIC_RANDOM_SEED,
  DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY,
} from "../src/shared/test-utils/random/random.fixture.ts";

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 };
const SKIP_VRT_TAG = "skip-vrt";
const VRT_SNAPSHOTS_DIR = `${process.cwd()}/__snapshots__/vrt`;
const VRT_RECEIVED_DIR = `${VRT_SNAPSHOTS_DIR}/__received_output__`;
const SNAPSHOT_FAILURE_THRESHOLD = 0.005;
const STORY_RENDER_TIMEOUT_MS = 10_000;
const STORY_SETTLE_QUIET_MS = 300;
const SUBRESOURCE_TIMEOUT_MS = 5_000;

const pagesWithDeterministicRandomSeed = new WeakSet<object>();

/** Snap animations/transitions to done (with reducedMotion in preVisit). */
const DISABLE_ANIMATIONS_CSS = `
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.001ms !important;
    transition-delay: 0ms !important;
  }
`;

const vrtStoryIds = new Set<string>();

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },

  async preVisit(page, context) {
    if (!pagesWithDeterministicRandomSeed.has(page)) {
      const payload = {
        key: DETERMINISTIC_RANDOM_SEED_GLOBAL_KEY,
        seed: DEFAULT_DETERMINISTIC_RANDOM_SEED,
      };
      await page.addInitScript(({ key, seed }) => {
        Object.assign(globalThis, { [key]: seed });
      }, payload);
      await page.evaluate(({ key, seed }) => {
        Object.assign(globalThis, { [key]: seed });
      }, payload);
      pagesWithDeterministicRandomSeed.add(page);
    }

    await injectAxe(page);

    const storyContext = await getStoryContext(page, context);

    // @ts-expect-error storyGlobals は Storybook 10 で追加されたが型定義が未対応
    const viewportName = storyContext.storyGlobals?.viewport?.value as
      | string
      | undefined;
    const viewportParameter = viewportName
      ? INITIAL_VIEWPORTS[viewportName as keyof typeof INITIAL_VIEWPORTS]
      : undefined;

    if (viewportParameter) {
      const viewportSize = Object.fromEntries(
        Object.entries(viewportParameter.styles).map(([screen, size]) => [
          screen,
          Number.parseInt(size as string, 10),
        ]),
      ) as { width: number; height: number };
      await page.setViewportSize(viewportSize);
    } else {
      await page.setViewportSize(DEFAULT_VIEWPORT_SIZE);
    }

    if (!storyContext.tags?.includes(SKIP_VRT_TAG)) {
      vrtStoryIds.add(context.id);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addStyleTag({ content: DISABLE_ANIMATIONS_CSS });
    }
  },

  async postVisit(page, context) {
    await page.waitForLoadState("networkidle");

    await checkA11y(page, "#storybook-root", {
      includedImpacts: ["critical"],
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    if (vrtStoryIds.has(context.id)) {
      await waitForPageReady(page);

      // Wait for RSC to finish committing (null → use skip-vrt).
      await page
        .evaluate(
          async ({ quietMs, timeoutMs }) => {
            const root = document.getElementById("storybook-root");
            if (!root) {
              throw new Error("#storybook-root missing");
            }
            await new Promise<void>((resolve, reject) => {
              const maxTimer = setTimeout(() => {
                cleanup();
                reject(new Error("story settle timeout"));
              }, timeoutMs);
              let quietTimer: ReturnType<typeof setTimeout>;
              const cleanup = () => {
                clearTimeout(maxTimer);
                clearTimeout(quietTimer);
                observer.disconnect();
              };
              const scheduleQuiet = () => {
                clearTimeout(quietTimer);
                quietTimer = setTimeout(() => {
                  cleanup();
                  resolve();
                }, quietMs);
              };
              const observer = new MutationObserver(scheduleQuiet);
              observer.observe(root, {
                childList: true,
                subtree: true,
                characterData: true,
              });
              scheduleQuiet();
            });
          },
          {
            quietMs: STORY_SETTLE_QUIET_MS,
            timeoutMs: STORY_RENDER_TIMEOUT_MS,
          },
        )
        .catch((cause: unknown) => {
          throw new Error(
            `Story did not settle: ${context.id}. Fix the story or opt out with tags: ["skip-vrt"].`,
            { cause },
          );
        });

      const isEmpty = await page.evaluate(
        () =>
          (document.getElementById("storybook-root")?.innerHTML.length ?? 0) ===
          0,
      );
      if (isEmpty) {
        throw new Error(
          `Story rendered nothing: ${context.id}. Fix the story, or opt out with tags: ["skip-vrt"] when null is intentional.`,
        );
      }

      // Images, iframes, fonts — load Noto with page text for CJK subsets.
      await page.evaluate(
        async ({ families, weights, timeoutMs }) => {
          const settled = (element: HTMLElement, isLoaded: boolean) =>
            isLoaded ||
            Promise.race([
              new Promise<void>((resolve) => {
                element.addEventListener("load", () => resolve(), {
                  once: true,
                });
                element.addEventListener("error", () => resolve(), {
                  once: true,
                });
              }),
              new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
            ]);

          // Unloaded iframe looks "complete" on about:blank — wait for real URL.
          const iframeLoaded = (iframe: HTMLIFrameElement) => {
            try {
              const doc = iframe.contentDocument;
              return (
                doc?.readyState === "complete" && doc.URL !== "about:blank"
              );
            } catch {
              return false;
            }
          };

          await Promise.all([
            ...[...document.images].map((img) => settled(img, img.complete)),
            ...[...document.querySelectorAll("iframe")].map((iframe) =>
              settled(iframe, iframeLoaded(iframe)),
            ),
            document.fonts.ready,
          ]);

          const root = document.getElementById("storybook-root");
          const pageText = root?.innerText ?? "";
          const sampleByFamily: Record<string, string> = {
            Roboto: "ABCabc0123",
            "Noto Sans JP": `${pageText}あ`,
          };

          const jobs = families.flatMap((family) => {
            const sample = sampleByFamily[family] ?? pageText;
            return weights.map((weight) => {
              const descriptor = `${weight} 16px "${family}"`;
              return { descriptor, sample };
            });
          });

          await Promise.all(
            jobs.map(({ descriptor, sample }) =>
              document.fonts.load(descriptor, sample),
            ),
          );

          const missing = jobs
            .filter(
              ({ descriptor, sample }) =>
                !document.fonts.check(descriptor, sample),
            )
            .map(({ descriptor }) => descriptor);
          if (missing.length > 0) {
            throw new Error(
              `Primary webfonts unavailable after load: ${missing.join(", ")}`,
            );
          }
        },
        {
          families: [...primaryWebFontFamilies],
          weights: [...primaryWebFontWeights],
          timeoutMs: SUBRESOURCE_TIMEOUT_MS,
        },
      );
      const image = await page.screenshot();
      // biome-ignore lint/suspicious/noExplicitAny: jest-image-snapshot extends expect at runtime
      (expect(image) as any).toMatchImageSnapshot({
        customSnapshotsDir: VRT_SNAPSHOTS_DIR,
        customSnapshotIdentifier: context.id,
        storeReceivedOnFailure: true,
        customReceivedDir: VRT_RECEIVED_DIR,
        failureThreshold: SNAPSHOT_FAILURE_THRESHOLD,
        failureThresholdType: "percent",
      });
    }
  },

  tags: {
    skip: ["test:skip"],
  },
};

export default config;
