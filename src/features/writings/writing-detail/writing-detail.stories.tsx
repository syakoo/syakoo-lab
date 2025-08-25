import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import { generateDummySerializedWriting } from "@/entities/writing/models/writing.mocks";
import { readWritingById } from "@/features/writings/writing-reader";

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
