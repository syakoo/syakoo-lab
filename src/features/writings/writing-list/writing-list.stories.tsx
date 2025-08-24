import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import { generateDummyWritingHead } from "@/entities/writing/models/writing.mocks";
import { readWritingHeads } from "@/features/writings/writing-reader";
import { random } from "@/shared/test-utils/random/random";
import { range } from "@/shared/utils/array/range";

import { WritingList } from ".";

const meta = {
  component: WritingList,
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
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
