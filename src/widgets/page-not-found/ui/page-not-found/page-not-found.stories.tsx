import type { Meta, StoryObj } from "@storybook/nextjs";

import { PageNotFound } from "./page-not-found";

const meta = {
  component: PageNotFound,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PageNotFound>;

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
