import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import { generateDummyCreationSummary } from "@/entities/creation/models/creation.mocks";
import { readCreationSummaries } from "@/features/creation/creation-reader/read-creation";
import { random } from "@/shared/test-utils/random/random";
import { range } from "@/shared/utils/array/range";

import { RelatedCreations } from "./related-creations";

const meta = {
  component: RelatedCreations,
  parameters: {
    docs: {
      description: {
        component:
          "関連創作物一覧コンポーネント。Figma: https://www.figma.com/design/KM3QHHUgriWxt0RJ1MT5SB/syakoo-lab?node-id=616-891",
      },
    },
  },
  afterEach: () => {
    clearAllMocks();
  },
} satisfies Meta<typeof RelatedCreations>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    id: "sample-creation",
  },
  beforeEach: () => {
    const targetCreation = generateDummyCreationSummary();
    const mockCreations = [
      { ...targetCreation, id: "sample-creation" },
      ...range(0, random.integer(3, 5)).map(() =>
        generateDummyCreationSummary(),
      ),
    ];
    mocked(readCreationSummaries).mockResolvedValue(mockCreations);
  },
};

/** 最大10件まで表示される */
export const MaxItems: Story = {
  args: {
    id: "max-items-creation",
  },
  beforeEach: () => {
    const targetCreation = generateDummyCreationSummary();
    const mockCreations = [
      { ...targetCreation, id: "max-items-creation" },
      ...range(0, 12).map(() => generateDummyCreationSummary()),
    ];
    mocked(readCreationSummaries).mockResolvedValue(mockCreations);
  },
};
