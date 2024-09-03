import type { Meta } from "@storybook/react";
import type React from "react";

import { theme } from "@/design-system/theme.css";

import { Center } from ".";

const meta = {
  component: Center,
  tags: ["autodocs"],
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof Center>;

export default meta;

const SampleInnerContent = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: theme.radius[100],
      background: theme.color.palette.gray[100],
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
