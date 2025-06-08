import type { Meta, StoryObj } from "@storybook/react";

import {
  generateDummyCreationGame,
  generateDummyCreationIllust,
  generateDummyCreationWebapp,
} from "@/entities/creation/models/creation.mocks";

import { CreationCard } from "./creation-card";

const meta = {
  component: CreationCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "https://www.figma.com/design/KM3QHHUgriWxt0RJ1MT5SB/syakoo-lab?node-id=477-122&t=kVsF3rxs1WNK1866-4",
      },
    },
    testLevel: "snapshot",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Illust: Story = {
  args: { ...generateDummyCreationIllust() },
};

export const Game: Story = {
  args: { ...generateDummyCreationGame() },
};

export const WebApp: Story = {
  args: { ...generateDummyCreationWebapp() },
};
