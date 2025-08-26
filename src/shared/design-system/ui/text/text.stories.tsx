import type { Meta } from "@storybook/nextjs";

import { H1, H2, H3, H4, P, Span, Text } from ".";

const meta = {
  component: Text,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Text>;

export default meta;

export const Sample = () => {
  return (
    <>
      <H1>H1</H1>
      <H2>H2</H2>
      <H3>H3</H3>
      <H4>H4</H4>
      <P>P</P>
      <Span>Span</Span>
    </>
  );
};

export const Colors = () => {
  return (
    <>
      <Text color="currentColor">currentColor (default)</Text>
      <Text color="primary">primary</Text>
      <Text color="secondary">secondary</Text>
      <Text color="tertiary">tertiary</Text>
    </>
  );
};

export const Sizes = () => {
  return (
    <>
      <Text size="50">50</Text>
      <Text size="100">100 (default)</Text>
      <Text size="200">200</Text>
      <Text size="300">300</Text>
      <Text size="400">400</Text>
      <Text size="500">500</Text>
      <Text size="600">600</Text>
      <Text size="700">700</Text>
      <Text size="800">800</Text>
    </>
  );
};

export const Weights = () => {
  return (
    <>
      <Text size="100" weight="normal">
        normal (default)
      </Text>
      <Text weight="bold">bold</Text>
    </>
  );
};
