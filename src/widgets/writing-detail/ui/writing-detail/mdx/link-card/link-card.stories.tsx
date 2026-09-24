import type { Meta, StoryObj } from "@storybook/nextjs";

import { dummyImages } from "../../../../../../shared/test-utils/dummy-asset/dummy-asset";

import { LinkCard } from "./link-card";

const DUMMY_FAVICON = dummyImages["50x50"].src;

const meta = {
  component: LinkCard,
  parameters: {},
  args: {
    faviconSrc: DUMMY_FAVICON,
  },
} satisfies Meta<typeof LinkCard>;

export default meta;

type Story = StoryObj<typeof LinkCard>;

export const Sample: Story = {
  args: {
    title: "Sample Title",
    url: "https://syakoo-lab.com/",
    description: "sample description",
  },
};

export const LongText: Story = {
  args: {
    title: "Sample Title Sample Title Sample Title Sample Title Sample Title",
    url: "https://syakoo-lab.com/",
    description:
      "sample description sample description sample description sample description",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "霧島国際ホテル",
    url: "https://www.kirishima-kokusai.com/",
  },
};
