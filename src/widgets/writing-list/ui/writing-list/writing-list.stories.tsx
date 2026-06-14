import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import { generateDummyWritingHead } from "../../../../entities/writing";
import { readWritingHeads } from "../../../../entities/writing/index.server";
import { random } from "../../../../shared/test-utils/random/random";
import { range } from "../../../../shared/utils/array/range";

import { WritingList } from "./writing-list";

const meta = {
  component: WritingList,
  parameters: {
    layout: "fullscreen",
  },
  afterEach: () => {
    clearAllMocks();
  },
} satisfies Meta<typeof WritingList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  beforeEach: () => {
    const mockHeads = range(0, random.integer(5, 10)).map(() =>
      generateDummyWritingHead(),
    );
    mocked(readWritingHeads).mockResolvedValue(mockHeads);
  },
};

export const GroupedByYear: Story = {
  beforeEach: () => {
    const years = ["2026", "2025", "2024", "2023"];
    const mockHeads = years.flatMap((year) =>
      range(0, random.integer(2, 5)).map((_, i) =>
        generateDummyWritingHead({
          published: `${year}-${String(random.integer(1, 12)).padStart(2, "0")}-${String(random.integer(1, 28)).padStart(2, "0")}`,
          id: `${year}-item-${i}`,
        }),
      ),
    );
    mocked(readWritingHeads).mockResolvedValue(mockHeads);
  },
};
