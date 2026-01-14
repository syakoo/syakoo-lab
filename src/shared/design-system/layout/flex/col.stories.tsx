import type { Meta, StoryObj } from "@storybook/nextjs";

import { theme } from "@/shared/design-system/theme.css";

import { Col, FlexItem } from "./flex";

const meta = {
  component: Col,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Col>;

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
      borderRadius: theme.radius[100],
      background: theme.color.palette.gray[100],
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

export const Col_: StoryObj<typeof Col> = {
  args: {
    children: (
      <>
        <SampleInnerContent height="260px" width="260px" />
        <SampleInnerContent height="140px" width="140px" />
        <SampleInnerContent height="200px" width="200px" />
        <SampleInnerContent height="100px" width="auto" />
      </>
    ),
  },
};

export const ColWithItem: StoryObj<typeof Col> = {
  args: {
    children: (
      <>
        <SampleInnerContent height="260px" width="260px" />
        <FlexItem align="center">
          <SampleInnerContent height="140px" width="100%" />
        </FlexItem>
        <FlexItem align="stretch">
          <SampleInnerContent height="200px" width="100%" />
        </FlexItem>
        <SampleInnerContent height="100px" width="auto" />
      </>
    ),
  },
};
