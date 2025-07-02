import type { Meta, StoryObj } from "@storybook/react";

import { WritingDetailView } from "./writing-detail.view";

const meta = {
  component: WritingDetailView,
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof WritingDetailView>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    writing: {
      head: {
        id: "sample-writing-meta-id1",
        title: "Sample Article",
        type: "article",
        tags: ["雑記", "Sample"],
        published: "2023-10-09",
      },
      body: {
        type: "serialized",
        data: `
`,
      },
    },
  },
};
