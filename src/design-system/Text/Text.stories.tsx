import type { Meta, StoryObj } from "@storybook/react";
import { Text } from ".";

const meta = {
  component: Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;

export const Sample: StoryObj<typeof Text> = {
  args: {
    children: "sample text",
  },
};
