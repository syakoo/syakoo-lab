import type { Meta, StoryObj } from "@storybook/react";
import { WritingLink } from ".";

const meta = {
  component: WritingLink,
  tags: ["autodocs"],
} satisfies Meta<typeof WritingLink>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Article: Story = {
  args: {
    meta: {
      id: "sample-writing-meta-id",
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
      id: "sample-writing-meta-id",
      link: "/writing/post/20231009",
      title: "Sample Note",
      type: "note",
      tags: ["雑記", "Sample"],
      published: "2023-10-09",
    },
  },
};

export const Sample: Story = {
  args: {
    meta: {
      id: "sample-writing-meta-id",
      link: "/writing/post/20231009",
      title: "Sample Diary",
      type: "diary",
      tags: ["雑記", "Sample"],
      published: "2023-10-09",
    },
  },
};
