import type { Meta, StoryObj } from "@storybook/react";

import { tokens } from "@/design-system/tokens";

import { Row, FlexItem } from ".";

const meta = {
  component: Row,
  tags: ["autodocs"],
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
      borderRadius: tokens.radii[100],
      background: tokens.colors.palette.gray[100],
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
