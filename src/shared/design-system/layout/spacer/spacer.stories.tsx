import type { Meta, StoryObj } from "@storybook/nextjs";

import { Spacer } from "./spacer";

const meta = {
  component: Spacer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Spacer>;

export default meta;

const DummyBlock = ({ width, height }: { width: string; height: string }) => (
  <div
    style={{
      borderRadius: "var(--radius-100)",
      background: "var(--color-background-secondary)",
      width,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
);

type Story = StoryObj<typeof meta>;
export const X: Story = {
  args: { x: "200" },
  render: (props) => {
    return (
      <div style={{ display: "flex" }}>
        <DummyBlock height="50px" width="50px" />
        <Spacer {...props} />
        <DummyBlock height="50px" width="50px" />
      </div>
    );
  },
};

export const Y: Story = {
  args: { y: "200" },
  render: (props) => {
    return (
      <div>
        <DummyBlock height="50px" width="50px" />
        <Spacer {...props} />
        <DummyBlock height="50px" width="50px" />
      </div>
    );
  },
};
