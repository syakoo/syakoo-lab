import type { TestRunnerConfig } from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
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
