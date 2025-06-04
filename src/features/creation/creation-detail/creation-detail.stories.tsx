import type { Meta, StoryObj } from "@storybook/react";

import {
  generateDummyCreationGame,
  generateDummyCreationIllust,
  generateDummyCreationWebapp,
} from "@/entities/creation/models/creation.mocks";

import { CreationDetail } from ".";

const meta = {
  component: CreationDetail,
  parameters: {
    docs: {
      description: {
        component:
          "https://www.figma.com/design/KM3QHHUgriWxt0RJ1MT5SB/syakoo-lab?node-id=541-986&t=kVsF3rxs1WNK1866-4",
      },
    },
    testLevel: "snapshot",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreationDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Illust: Story = {
  args: {
    creation: generateDummyCreationIllust(),
  },
};

export const Game: Story = {
  args: {
    creation: generateDummyCreationGame(),
  },
};

export const Webapp: Story = {
  args: {
    creation: generateDummyCreationWebapp(),
  },
};
