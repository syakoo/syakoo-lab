import type { Meta, StoryObj } from "@storybook/react";

import { BookView } from ".";

const meta = {
  component: BookView,
} satisfies Meta<typeof BookView>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    title: "BookTitle",
    imgSrc: "https://placehold.jp/3063D4/ffffff/150x200.png",
    amazonLink: "/",
    published: "2022-04-07",
    author: "syakoo",
  },
};
