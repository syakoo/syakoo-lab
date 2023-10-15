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
export const Article: Story = {
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

export const Note: Story = {
  args: {
    meta: {
      id: "sample-writing-meta-id1",
      link: "/writing/post/20231009",
      title: "Sample Note",
      type: "note",
      tags: ["雑記", "Sample", "Note"],
      published: "2023-10-09",
    },
  },
};

export const Diary: Story = {
  args: {
    meta: {
      id: "sample-writing-meta-id1",
      link: "/writing/post/20231009",
      title: "Sample Diary",
      type: "diary",
      tags: ["雑記"],
      published: "2023-10-09",
    },
  },
};
