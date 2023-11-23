import type { Meta, StoryObj } from "@storybook/react";

import { ArtList } from ".";

const meta = {
  component: ArtList,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ArtList>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    heads: [
      {
        id: "sample-id-1",
        title: "Sample Art Title",
        published: "20231029",
        imgUrl: "https://placehold.jp/3063D4/ffffff/2000x1500.png",
        size: { width: 2500, height: 1500 },
        tags: ["sampleTag"],
      },
      {
        id: "sample-id-2",
        title: "Sample Art Title 2",
        published: "20231030",
        imgUrl: "https://placehold.jp/3063D4/ffffff/2500x1500.png",
        size: { width: 2500, height: 1500 },
        tags: ["sampleTag"],
      },
      {
        id: "sample-id-3",
        title: "Sample Art Title 3",
        published: "20231031",
        imgUrl: "https://placehold.jp/3063D4/ffffff/1500x2000.png",
        size: { width: 1500, height: 2000 },
        tags: ["sampleTag"],
      },
    ],
  },
};
