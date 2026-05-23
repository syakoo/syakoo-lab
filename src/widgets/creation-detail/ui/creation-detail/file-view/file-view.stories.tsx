import type { Meta, StoryObj } from "@storybook/nextjs";

import { FileViewUI } from "./file-view-ui";

const meta = {
  component: FileViewUI,
  parameters: {},
} satisfies Meta<typeof FileViewUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileName: "example.txt",
    children: "This is the content of the file.",
  },
};

export const LongFileName: Story = {
  args: {
    fileName: "this_is_a_very_long_file_name_that_should_be_truncated.txt",
    children: "This is the content of the file.",
  },
};
