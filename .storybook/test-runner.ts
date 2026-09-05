import {
  getStoryContext,
  type TestRunnerConfig,
  waitForPageReady,
} from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 };
const VRT_TAG = "vrt";
const VRT_SNAPSHOTS_DIR = `${process.cwd()}/__snapshots__/vrt`;

/**
 * Injected as a <style> tag before story render to snap all CSS animations and
 * transitions to their completed state instantly.  Combined with
 * `page.emulateMedia({ reducedMotion: "reduce" })` this ensures deterministic
 * screenshots regardless of animation timing.
 */
const DISABLE_ANIMATIONS_CSS = `
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.001ms !important;
    transition-delay: 0ms !important;
  }
`;

/** Story IDs that carry the "vrt" tag — populated in preVisit, consumed in postVisit. */
const vrtStoryIds = new Set<string>();

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },

  async preVisit(page, context) {
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

    if (storyContext.tags?.includes(VRT_TAG)) {
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
      const image = await page.screenshot();
      // biome-ignore lint/suspicious/noExplicitAny: jest-image-snapshot extends expect at runtime
      (expect(image) as any).toMatchImageSnapshot({
        customSnapshotsDir: VRT_SNAPSHOTS_DIR,
        customSnapshotIdentifier: context.id,
        // Cloud Agent vs GHA Chromium can differ ~1.5% on wide token galleries.
        failureThreshold: 0.02,
        failureThresholdType: "percent",
      });
    }
  },

  tags: {
    skip: ["test:skip"],
  },
};

export default config;
