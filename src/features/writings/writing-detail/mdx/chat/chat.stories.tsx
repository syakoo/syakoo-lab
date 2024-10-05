import type { Meta, StoryObj } from "@storybook/react";

import { Chat } from ".";

const meta = {
  component: Chat,
} satisfies Meta<typeof Chat>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    image: "fuyu1",
    children: (
      <>
        <Chat.Message>
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </Chat.Message>
        <Chat.Message>そうですね。</Chat.Message>
      </>
    ),
  },
};

export const Right: Story = {
  args: {
    image: "fuyu1",
    right: true,
    children: (
      <>
        <Chat.Message>
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </Chat.Message>
        <Chat.Message>そうですね。</Chat.Message>
      </>
    ),
  },
};
