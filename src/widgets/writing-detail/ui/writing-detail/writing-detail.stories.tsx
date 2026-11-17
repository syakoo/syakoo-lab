import type { Meta, StoryObj } from "@storybook/react-vite";
import { clearAllMocks, mocked } from "storybook/test";

import { generateDummySerializedWriting } from "../../../../entities/writing";
import { readWritingById } from "../../../../entities/writing/index.server";

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

export const Mobile: Story = {
  ...Sample,
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
