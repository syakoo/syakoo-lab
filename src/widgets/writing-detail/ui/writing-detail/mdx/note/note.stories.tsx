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
    "aria-label": "補足情報",
  },
};

export const Variants = () => {
  return (
    <div>
      <Note aria-label="補足情報" variant="note">
        Variant: Default
      </Note>
      <Note aria-label="警告情報" variant="warn">
        Variant: Warn
      </Note>
    </div>
  );
};
