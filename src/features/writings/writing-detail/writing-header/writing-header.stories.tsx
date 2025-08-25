import type { Meta, StoryObj } from "@storybook/nextjs";

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
    head: {
      id: "sample-writing-meta-id1",
      title: "Sample Article",
      type: "article",
      tags: ["雑記", "Sample"],
      published: "2023-10-09",
    },
  },
};

export const Note: Story = {
  args: {
    head: {
      id: "sample-writing-meta-id1",
      title: "Sample Note",
      type: "note",
      tags: ["雑記", "Sample", "Note"],
      published: "2023-10-09",
    },
  },
};

export const Diary: Story = {
  args: {
    head: {
      id: "sample-writing-meta-id1",
      title: "Sample Diary",
      type: "diary",
      tags: ["雑記"],
      published: "2023-10-09",
    },
  },
};

export const Updated: Story = {
  args: {
    head: {
      id: "sample-writing-meta-id1",
      title: "Sample Diary",
      type: "diary",
      tags: ["雑記"],
      published: "2023-10-09",
      updated: "2023-11-03",
    },
  },
};
