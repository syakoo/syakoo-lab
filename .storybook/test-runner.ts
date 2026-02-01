import { getStoryContext, type TestRunnerConfig } from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 };

const config: TestRunnerConfig = {
  async preVisit(page, context) {
    await injectAxe(page);

    // Story の context を取得して viewport を設定
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
  },
  async postVisit(page) {
    await page.waitForLoadState("networkidle");

    await checkA11y(page, "#storybook-root", {
      includedImpacts: ["critical"],
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  },
  tags: {
    skip: ["test:skip"],
  },
};

export default config;
