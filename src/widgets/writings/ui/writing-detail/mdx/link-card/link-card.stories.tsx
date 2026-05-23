import type { Meta, StoryObj } from "@storybook/nextjs";

import { LinkCard } from "./link-card";

const meta = {
  component: LinkCard,
  parameters: {},
} satisfies Meta<typeof LinkCard>;

export default meta;

type Story = StoryObj<typeof LinkCard>;

export const Sample: Story = {
  args: {
    imgSrc: "https://placehold.jp/3063D4/ffffff/400x300.png",
    title: "Sample Title",
    url: "https://syakoo-lab.com/",
    description: "sample description",
    faviconSrc: "https://placehold.jp/3063D4/ffffff/64x64.png",
  },
};

export const LongText: Story = {
  args: {
    imgSrc: "https://placehold.jp/3063D4/ffffff/400x300.png",
    title: "Sample Title Sample Title Sample Title Sample Title Sample Title",
    url: "https://syakoo-lab.com/",
    description:
      "sample description sample description sample description sample description",
    faviconSrc: "https://placehold.jp/3063D4/ffffff/64x64.png",
  },
};
