import type { Meta, StoryObj } from "@storybook/react";

import { ArtGalleryItem } from ".";

const meta = {
  component: ArtGalleryItem,
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: "500px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArtGalleryItem>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    meta: {
      id: "sample-id-1",
      title: "Sample Art Title",
      published: "20231029",
      imgUrl: "https://placehold.jp/3063D4/ffffff/2000x1500.png",
      size: { width: 2500, height: 1500 },
      tags: ["sampleTag"],
    },
  },
};

export const LongText: Story = {
  args: {
    meta: {
      id: "sample-id-2",
      title:
        "Sample Art Title Sample Art Title Sample Art Title Sample Art Title Sample Art Title Sample Art Title",
      published: "20231029",
      imgUrl: "https://placehold.jp/3063D4/ffffff/2000x1500.png",
      size: { width: 2500, height: 1500 },
      tags: ["sampleTag"],
    },
  },
};
