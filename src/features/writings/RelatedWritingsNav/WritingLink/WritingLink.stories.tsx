import type { Meta, StoryObj } from "@storybook/react";

import { WritingLink } from ".";

const meta = {
  component: WritingLink,
  tags: ["autodocs"],
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof WritingLink>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Article: Story = {
  args: {
    head: {
      id: "sample-writing-meta-id",
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
      id: "sample-writing-meta-id",
      title: "Sample Note",
      type: "note",
      tags: ["雑記", "Sample"],
      published: "2023-10-09",
    },
  },
};

export const Sample: Story = {
  args: {
    head: {
      id: "sample-writing-meta-id",
      title: "Sample Diary",
      type: "diary",
      tags: ["雑記", "Sample"],
      published: "2023-10-09",
    },
  },
};
