import type { Meta, StoryObj } from "@storybook/nextjs";

import { FlexItem, Row } from "./flex";

const meta = {
  component: Row,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Row>;

export default meta;

const SampleInnerContent = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => (
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
  >
    {width} x {height}
  </div>
);

export const Row_: StoryObj<typeof Row> = {
  args: {
    children: (
      <>
        <SampleInnerContent height="260px" width="260px" />
        <SampleInnerContent height="140px" width="140px" />
        <SampleInnerContent height="200px" width="200px" />
        <SampleInnerContent height="auto" width="400px" />
      </>
    ),
  },
};

export const RowWithItem: StoryObj<typeof Row> = {
  args: {
    children: (
      <>
        <FlexItem shrink={0}>
          <SampleInnerContent height="260px" width="260px" />
        </FlexItem>
        <FlexItem align="stretch">
          <SampleInnerContent height="100%" width="100%" />
        </FlexItem>
        <FlexItem>
          <SampleInnerContent height="200px" width="200px" />
        </FlexItem>
        <SampleInnerContent height="auto" width="400px" />
      </>
    ),
  },
};
