import type { Meta, StoryObj } from "@storybook/react-vite";

import { AboutSite } from "./about-site";

const meta = {
  component: AboutSite,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AboutSite>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};

export const Mobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
