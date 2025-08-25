import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import {
  generateDummyCreationGame,
  generateDummyCreationIllust,
  generateDummyCreationWebapp,
} from "@/entities/creation/models/creation.mocks";
import { readCreationById } from "@/features/creation/creation-reader";

import { CreationDetail } from "./creation-detail";

const meta = {
  component: CreationDetail,
  parameters: {
    docs: {
      description: {
        component:
          "https://www.figma.com/design/KM3QHHUgriWxt0RJ1MT5SB/syakoo-lab?node-id=541-986&t=kVsF3rxs1WNK1866-4",
      },
    },
  },
  tags: ["autodocs"],
  afterEach: () => {
    clearAllMocks();
  },
} satisfies Meta<typeof CreationDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Illust: Story = {
  args: {
    id: "illust-sample",
  },
  beforeEach: () => {
    mocked(readCreationById).mockResolvedValue(generateDummyCreationIllust());
  },
};

export const Game: Story = {
  args: {
    id: "game-sample",
  },
  beforeEach: () => {
    mocked(readCreationById).mockResolvedValue(generateDummyCreationGame());
  },
};

export const Webapp: Story = {
  args: {
    id: "webapp-sample",
  },
  beforeEach: () => {
    mocked(readCreationById).mockResolvedValue(generateDummyCreationWebapp());
  },
};
