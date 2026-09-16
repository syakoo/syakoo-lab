import type { Meta, StoryObj } from "@storybook/nextjs";

import { dummyImages } from "../../../../../../shared/test-utils/dummy-asset/dummy-asset";

import { Image } from "./image";

const meta = {
  component: Image,
  parameters: {},
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof Image>;

export const Sample: Story = {
  args: {
    caption: "Sample Caption",
    ...dummyImages["400x300"],
  },
};
