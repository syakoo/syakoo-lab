import type { Meta } from "@storybook/nextjs";

import { Choices, Choice } from ".";

const meta = {
  component: Choices,
  parameters: { testLevel: "snapshot" },
} satisfies Meta<typeof Choices>;

export default meta;

export const Sample = () => {
  return (
    <Choices correct={1}>
      <Choice>wrong answer</Choice>
      <Choice>correct answer</Choice>
      <Choice>wrong answer</Choice>
    </Choices>
  );
};
