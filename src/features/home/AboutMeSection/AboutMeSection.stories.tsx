import type { Meta, StoryObj } from "@storybook/react";
import { AboutMeSection } from ".";

const meta = {
  component: AboutMeSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AboutMeSection>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
