import type { Meta, StoryObj } from "@storybook/react";
import { WritingTypeDescription } from ".";

const meta = {
  component: WritingTypeDescription,
} satisfies Meta<typeof WritingTypeDescription>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    type: "all",
  },
};

export const All = {
  render: () => {
    return (
      <div>
        <WritingTypeDescription type="all" />
        <WritingTypeDescription type="article" />
        <WritingTypeDescription type="note" />
        <WritingTypeDescription type="diary" />
      </div>
    );
  },
};
