import type { Meta, StoryObj } from "@storybook/react";
import { WritingBlock } from ".";
import type { WritingMeta } from "@/features/writings/types";

const meta = {
  component: WritingBlock,
} satisfies Meta<typeof WritingBlock>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
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

export const Types = () => {
  const data: WritingMeta[] = [
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
  ];

  return (
    <div>
      {data.map((meta) => (
        <div key={meta.id}>
          <WritingBlock meta={meta} />
        </div>
      ))}
    </div>
  );
};