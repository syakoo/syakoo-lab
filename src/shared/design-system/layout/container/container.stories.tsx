import type { Meta } from "@storybook/nextjs";
import type React from "react";

import { theme } from "@/shared/design-system/theme.css";

import { Container } from "./container";

const meta = {
  component: Container,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Container>;

export default meta;

const SampleInnerContent = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: theme.radius[100],
      background: theme.color.palette.gray[100],
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
