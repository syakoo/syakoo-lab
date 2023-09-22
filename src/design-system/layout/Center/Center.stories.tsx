import React from "react";
import { tokens } from "@design-system/tokens";
import type { Meta } from "@storybook/react";
import { Center } from ".";

const meta = {
  component: Center,
  tags: ["autodocs"],
} satisfies Meta<typeof Center>;

export default meta;

const SampleInnerContent = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: tokens.radii[100],
      background: tokens.colors.palette.gray[100],
      padding: "50px",
      width: "500px",
    }}
  >
    {children}
  </div>
);

export const Sample = () => {
  return (
    <Center>
      <SampleInnerContent>
        <Center>children</Center>
      </SampleInnerContent>
    </Center>
  );
};
