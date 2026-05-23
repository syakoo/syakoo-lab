import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import {
  generateDummyCreationGame,
  generateDummyCreationIllust,
  generateDummyCreationWebapp,
} from "../../../../entities/creation";
import { readCreationById } from "../../models/creation-reader/read-creation";

import { CreationDetail } from "./creation-detail";

const meta = {
  component: CreationDetail,
  parameters: {},
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
