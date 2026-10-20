import type { Meta, StoryObj } from "@storybook/nextjs";

import { HeaderFooterTemplate } from "./header-footer-template";

const meta = {
  component: HeaderFooterTemplate,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderFooterTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <div>children</div>,
  },
};

export const Mobile: Story = {
  ...Sample,
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
