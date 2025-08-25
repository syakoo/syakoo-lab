import type { Meta } from "@storybook/nextjs";

import { SectionTitle, SubSectionTitle } from ".";

const meta = {
  component: SectionTitle,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof SectionTitle>;

export default meta;

export const Sample = () => <SectionTitle>Sample Title</SectionTitle>;

export const ContainElements = () => (
  <SectionTitle>
    Sample <code>Title</code>
  </SectionTitle>
);

export const SubSection = () => (
  <SubSectionTitle>Sample SubTitle</SubSectionTitle>
);
