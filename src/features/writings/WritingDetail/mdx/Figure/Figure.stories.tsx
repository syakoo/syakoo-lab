import type { Meta } from "@storybook/react";

import { Figure } from ".";

const meta = {
  component: Figure,
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof Figure>;

export default meta;

export const Sample = () => {
  return (
    <Figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src="https://placehold.jp/3063D4/ffffff/400x300.png" />
      <Figure.Caption>sample caption</Figure.Caption>
    </Figure>
  );
};

export const NoCaption = () => {
  return (
    <Figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src="https://placehold.jp/3063D4/ffffff/150x200.png" />
    </Figure>
  );
};
