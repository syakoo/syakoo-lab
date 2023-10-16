import type { Meta, StoryObj } from "@storybook/react";
import { Note } from ".";

const meta = {
  component: Note,
  tags: ["autodocs"],
} satisfies Meta<typeof Note>;

export default meta;

type Story = StoryObj<typeof Note>;

export const Sample: Story = {
  args: {
    children: "サンプルテキスト",
  },
};

export const Variants = () => {
  return (
    <div>
      <Note variant="note">Variant: Default</Note>
      <Note variant="warn">Variant: Warn</Note>
    </div>
  );
};
