import type { Meta, StoryObj } from "@storybook/react";
import { WritingHeader } from ".";

const meta = {
  component: WritingHeader,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WritingHeader>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    meta: {
      id: "sample-writing-meta-id1",
      link: "/writing/post/20231009",
      title: "Sample Article",
      type: "article",
      tags: ["雑記", "Sample"],
      published: "2023-10-09",
    },
  },
};
