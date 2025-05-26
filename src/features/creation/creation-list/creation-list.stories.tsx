import type { Meta, StoryObj } from "@storybook/react";

import {
  generateDummyCreationIllust,
  generateDummyCreationGame,
  generateDummyCreationWebapp,
} from "@/entities/creation/models/creation.mocks";
import { random } from "@/shared/test-utils/random/random";
import { range } from "@/shared/utils/array/range";

import { CreationList } from ".";

const meta = {
  component: CreationList,
} satisfies Meta<typeof CreationList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    creations: range(0, random.integer(1, 10)).map(() =>
      random.pickOne([
        generateDummyCreationIllust(),
        generateDummyCreationGame(),
        generateDummyCreationWebapp(),
      ]),
    ),
  },
};
