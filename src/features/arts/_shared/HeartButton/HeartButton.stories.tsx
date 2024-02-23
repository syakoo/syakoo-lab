import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import { HeartButton } from ".";

const meta = {
  component: HeartButton,
  decorators: [
    (Story) => (
      <div style={{ width: "36px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof HeartButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Activated: Story = {
  args: {
    initialValue: true,
  },
};

export const ClickButton: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);
  },
};
