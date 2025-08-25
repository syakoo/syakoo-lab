import type { TestRunnerConfig } from "@storybook/test-runner";

const config: TestRunnerConfig = {
  async postVisit(page) {
    await page.waitForLoadState("networkidle");
  },
  tags: {
    skip: ["test:skip"],
  },
};

export default config;
