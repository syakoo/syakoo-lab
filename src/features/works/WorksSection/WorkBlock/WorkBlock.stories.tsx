import type { Meta, StoryObj } from "@storybook/react";

import { WorkBlock } from ".";

const meta = {
  component: WorkBlock,
} satisfies Meta<typeof WorkBlock>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    work: {
      name: "Work Name",
      imageSrc: {
        src: "https://placehold.jp/3063D4/ffffff/50x50.png",
        width: 50,
        height: 50,
      },
      releasedAt: "2023/10/03",
      siteUrl: "#",
      repositoryUrl: "https://github.com/syakoo",
      description: "ここに作品の説明文が入ります。",
    },
  },
};
