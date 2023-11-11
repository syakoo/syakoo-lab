import type { Meta, StoryObj } from "@storybook/react";

import { tokens } from "@/design-system/tokens";

import { Icon } from ".";
import { iconDictionary } from "./Icon";

const meta = {
  component: Icon,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    name: "document",
    width: 100,
  },
};

export const Gallery = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        color: tokens.colors.text.primary,
      }}
    >
      {Object.entries(iconDictionary).map(([name, Component]) => (
        <div
          key={name}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "48px",
              padding: "8px",
              backgroundColor: tokens.colors.background.secondary,
              borderRadius: "8px",
            }}
          >
            <Component />
          </div>
          <div style={{ fontSize: "12px", width: "100px" }}>{name}</div>
        </div>
      ))}
    </div>
  );
};
