import type { Meta } from "@storybook/nextjs";

import { dummyImages } from "../../../../../../shared/test-utils/dummy-asset/dummy-asset";

import { Figure } from "./figure-with-caption";

const meta = {
  component: Figure,
  parameters: {},
} satisfies Meta<typeof Figure>;

export default meta;

export const Sample = () => {
  return (
    <Figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={dummyImages["400x300"].src} />
      <Figure.Caption>sample caption</Figure.Caption>
    </Figure>
  );
};

export const NoCaption = () => {
  return (
    <Figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={dummyImages["150x200"].src} />
    </Figure>
  );
};
