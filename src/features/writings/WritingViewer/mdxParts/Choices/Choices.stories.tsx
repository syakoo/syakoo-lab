import type { Meta } from "@storybook/react";
import { Choices, Choice } from ".";

const meta = {
  component: Choices,
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
