import type { Meta, StoryObj } from "@storybook/react";
import { Links } from ".";

const meta = {
  component: Links,
} satisfies Meta<typeof Links>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    links: [
      {
        name: "Name1",
        url: "#",
        imageSrc: {
          src: "https://placehold.jp/3063D4/ffffff/50x50.png",
          width: 50,
          height: 50,
        },
      },
      {
        name: "Name2",
        url: "#",
        imageSrc: {
          src: "https://placehold.jp/294e80/ffffff/50x50.png",
          width: 50,
          height: 50,
        },
      },
      {
        name: "Name3",
        url: "#",
        imageSrc: {
          src: "https://placehold.jp/00ABEE/ffffff/100x100.png",
          width: 100,
          height: 100,
        },
      },
    ],
  },
};
