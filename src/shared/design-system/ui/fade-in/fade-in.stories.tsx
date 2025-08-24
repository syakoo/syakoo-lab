import type { Meta, StoryObj } from "@storybook/nextjs";

import { theme } from "@/shared/design-system/theme.css";

import { FadeIn } from ".";

const meta = {
  component: FadeIn,
  tags: ["autodocs"],
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof FadeIn>;

export default meta;

const SampleInnerContent = () => (
  <div
    style={{
      borderRadius: theme.radius[100],
      background: theme.color.palette.gray[100],
      padding: "50px",
      textAlign: "center",
    }}
  >
    Children
  </div>
);

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <SampleInnerContent />,
  },
};
