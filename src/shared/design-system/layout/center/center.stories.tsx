import type { Meta } from "@storybook/nextjs";
import type React from "react";

import { Center } from "./center";

const meta = {
  component: Center,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Center>;

export default meta;

const SampleInnerContent = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: "var(--radius-100)",
      background: "var(--color-background-secondary)",
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
