import type { Meta } from "@storybook/react";
import type React from "react";

import { tokens } from "@/design-system/tokens";

import { Container } from ".";

const meta = {
  component: Container,
  tags: ["autodocs"],
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof Container>;

export default meta;

const SampleInnerContent = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: tokens.radii[100],
      background: tokens.colors.palette.gray[100],
      padding: "50px",
    }}
  >
    {children}
  </div>
);

export const Sample = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <div>
        <Container>
          <SampleInnerContent>size: 100 (default)</SampleInnerContent>
        </Container>
      </div>
      <div>
        <Container size="50">
          <SampleInnerContent>size: 50</SampleInnerContent>
        </Container>
      </div>
    </div>
  );
};
