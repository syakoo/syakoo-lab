import type { Meta, StoryObj } from "@storybook/react";
import { FadeIn } from ".";
import { tokens } from "@/design-system/tokens";

const meta = {
  component: FadeIn,
  tags: ["autodocs"],
} satisfies Meta<typeof FadeIn>;

export default meta;

const SampleInnerContent = () => (
  <div
    style={{
      borderRadius: tokens.radii[100],
      background: tokens.colors.palette.gray[100],
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
