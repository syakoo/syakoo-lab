import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import { generateDummyWritingHead } from "../../../entities";
import { random } from "../../../shared";
import { range } from "../../../shared";
import { readWritingHeads } from "../../models/writing-reader/read-writing";

import { RelatedWritingsNav } from "./related-writings-nav";

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
