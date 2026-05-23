import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import { generateDummySerializedWriting } from "../../../../entities/writing";
import { readWritingById } from "../../models/writing-reader/read-writing";

import { WritingDetail } from "./writing-detail";

const meta: Meta<typeof WritingDetail> = {
  component: WritingDetail,
  parameters: {},
  afterEach: () => {
    clearAllMocks();
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    id: "sample-writing-id",
  },
  beforeEach: () => {
    mocked(readWritingById).mockResolvedValue(generateDummySerializedWriting());
  },
};
