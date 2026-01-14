import type { Meta, StoryObj } from "@storybook/nextjs";

import { Note } from "./note";

const meta = {
  component: Note,
  tags: ["autodocs"],
  parameters: {},
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
