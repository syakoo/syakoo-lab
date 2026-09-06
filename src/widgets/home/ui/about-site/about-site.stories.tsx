import type { Meta, StoryObj } from "@storybook/nextjs";

import { AboutSite } from "./about-site";

const meta = {
  component: AboutSite,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AboutSite>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
