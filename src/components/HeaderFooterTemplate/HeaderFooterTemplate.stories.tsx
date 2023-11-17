import type { Meta, StoryObj } from "@storybook/react";

import { HeaderFooterTemplate } from ".";

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
