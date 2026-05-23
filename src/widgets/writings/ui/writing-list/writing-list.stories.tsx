import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import { generateDummyWritingHead } from "../../../entities";
import { random } from "../../../shared";
import { range } from "../../../shared";
import { readWritingHeads } from "../../models/writing-reader/read-writing";

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
