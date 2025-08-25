import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import { generateDummyWritingHead } from "@/entities/writing/models/writing.mocks";
import { readWritingHeads } from "@/features/writings/writing-reader";
import { random } from "@/shared/test-utils/random/random";
import { range } from "@/shared/utils/array/range";

import { RelatedWritingsNav } from ".";

const meta = {
  component: RelatedWritingsNav,
  parameters: {
    layout: "fullscreen",
  },
  afterEach: () => {
    clearAllMocks();
  },
} satisfies Meta<typeof RelatedWritingsNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    id: "sample-writing-id",
  },
  beforeEach: ({ args: { id } }) => {
    const mockHeads = range(0, random.integer(3, 5)).map(() =>
      generateDummyWritingHead(),
    );
    mocked(readWritingHeads).mockResolvedValue([
      generateDummyWritingHead({ id }),
      ...mockHeads,
    ]);
  },
};

export const Empty: Story = {
  args: {
    id: "sample-writing-id",
  },
  beforeEach: ({ args: { id } }) => {
    mocked(readWritingHeads).mockResolvedValue([
      generateDummyWritingHead({ id }),
    ]);
  },
};
