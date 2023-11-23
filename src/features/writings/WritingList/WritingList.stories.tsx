import type { Meta, StoryObj } from "@storybook/react";

import { WritingList } from ".";

const meta = {
  component: WritingList,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WritingList>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    heads: [
      {
        id: "sample-writing-meta-id1",
        link: "/writing/post/20231009",
        title: "Sample Article",
        type: "article",
        tags: ["雑記", "Sample"],
        published: "2023-10-09",
      },
      {
        id: "sample-writing-meta-id2",
        link: "/writing/post/20231010",
        title: "Sample Note",
        type: "note",
        tags: ["雑記", "Sample"],
        published: "2023-10-10",
      },
      {
        id: "sample-writing-meta-id3",
        link: "/writing/post/20231011",
        title: "Sample Diary",
        type: "diary",
        tags: ["雑記"],
        published: "2023-10-11",
      },
    ],
  },
};
