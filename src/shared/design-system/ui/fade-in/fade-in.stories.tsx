import type { Meta, StoryObj } from "@storybook/nextjs";

import { FadeIn } from "./fade-in";

const meta = {
  component: FadeIn,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof FadeIn>;

export default meta;

const SampleInnerContent = () => (
  <div className="rounded-100 bg-background-secondary p-200 text-center">
    Children
  </div>
);

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <SampleInnerContent />,
  },
};
