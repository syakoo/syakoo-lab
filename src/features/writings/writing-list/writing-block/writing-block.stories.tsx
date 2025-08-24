import type { Meta, StoryObj } from "@storybook/nextjs";

import type { WritingHead } from "@/entities/writing/models/writing";

import { WritingBlock } from ".";

const meta = {
  component: WritingBlock,
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof WritingBlock>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
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

export const Types = () => {
  const data: WritingHead[] = [
    {
      id: "sample-writing-meta-id1",
      title: "Sample Article",
      type: "article",
      tags: ["雑記", "Sample"],
      published: "2023-10-09",
    },
    {
      id: "sample-writing-meta-id2",
      title: "Sample Note",
      type: "note",
      tags: ["雑記", "Sample"],
      published: "2023-10-10",
    },
    {
      id: "sample-writing-meta-id3",
      title: "Sample Diary",
      type: "diary",
      tags: ["雑記"],
      published: "2023-10-11",
    },
  ];

  return (
    <div>
      {data.map((head) => (
        <div key={head.id}>
          <WritingBlock head={head} />
        </div>
      ))}
    </div>
  );
};
