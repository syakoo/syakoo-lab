import type { Meta, StoryObj } from "@storybook/react";

import { WorksSection } from ".";

const meta = {
  component: WorksSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WorksSection>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {};
