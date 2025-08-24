import type { Meta, StoryObj } from "@storybook/nextjs";

import { List } from ".";

const meta = {
  component: List,
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    children: <div>children</div>,
  },
  render: (args) => (
    <List {...args}>
      <List.Item>List.Item</List.Item>
      <List.Item>List.Item</List.Item>
      <List.Item>List.Item</List.Item>
    </List>
  ),
};
