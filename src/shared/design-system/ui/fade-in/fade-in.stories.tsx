import type { Meta, StoryObj } from "@storybook/nextjs";

import { FadeIn } from "./fade-in";

const meta = {
  component: FadeIn,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof FadeIn>;

export default meta;

const SampleInnerContent = () => (
  <div
    style={{
      borderRadius: "var(--radius-100)",
      background: "var(--color-palette-gray-100)",
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
