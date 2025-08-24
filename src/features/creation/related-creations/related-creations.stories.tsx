import type { Meta, StoryObj } from "@storybook/nextjs";

import { generateDummyCreationSummary } from "@/entities/creation/models/creation.mocks";
import { random } from "@/shared/test-utils/random/random";
import { range } from "@/shared/utils/array/range";

import { RelatedCreationsView } from "./related-creations.view";

const meta = {
  component: RelatedCreationsView,
  parameters: {
    testLevel: "snapshot",
    docs: {
      description: {
        component:
          "関連創作物一覧コンポーネント。Figma: https://www.figma.com/design/KM3QHHUgriWxt0RJ1MT5SB/syakoo-lab?node-id=616-891",
      },
    },
  },
} satisfies Meta<typeof RelatedCreationsView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    relatedCreations: range(0, random.integer(1, 5)).map(() =>
      generateDummyCreationSummary(),
    ),
  },
};

/** 最大10件まで表示される */
export const MaxItems: Story = {
  args: {
    relatedCreations: range(0, 10).map(() => generateDummyCreationSummary()),
  },
};
