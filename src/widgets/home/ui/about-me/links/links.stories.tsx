import type { Meta, StoryObj } from "@storybook/nextjs";

import { dummyImages } from "../../../../../shared/test-utils/dummy-asset/dummy-asset";

import { Links } from "./links";

const meta = {
  component: Links,
  parameters: {},
} satisfies Meta<typeof Links>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    links: [
      { name: "Name1", url: "#", imageSrc: dummyImages["50x50"] },
      { name: "Name2", url: "#", imageSrc: dummyImages["100x100"] },
      { name: "Name3", url: "#", imageSrc: dummyImages["200x200"] },
    ],
  },
};
