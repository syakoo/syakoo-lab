import type { Meta, StoryObj } from "@storybook/nextjs";

import { PageNotFound } from "./page-not-found";

const meta = {
  component: PageNotFound,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["vrt"],
} satisfies Meta<typeof PageNotFound>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <div>children</div>,
  },
};
