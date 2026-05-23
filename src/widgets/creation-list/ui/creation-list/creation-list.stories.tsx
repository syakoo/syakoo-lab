import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import {
  generateDummyCreationGame,
  generateDummyCreationIllust,
  generateDummyCreationWebapp,
} from "../../../../entities/creation";
import { readCreationSummaries } from "../../../../entities/creation/index.server";
import { random } from "../../../../shared/test-utils/random/random";
import { range } from "../../../../shared/utils/array/range";

import { CreationList } from "./creation-list";

const meta = {
  component: CreationList,
  parameters: {},
  afterEach: () => {
    clearAllMocks();
  },
} satisfies Meta<typeof CreationList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  beforeEach: () => {
    const mockCreations = range(0, random.integer(5, 10)).map(() =>
      random.pickOne([
        generateDummyCreationIllust(),
        generateDummyCreationGame(),
        generateDummyCreationWebapp(),
      ]),
    );
    mocked(readCreationSummaries).mockResolvedValue(mockCreations);
  },
};
