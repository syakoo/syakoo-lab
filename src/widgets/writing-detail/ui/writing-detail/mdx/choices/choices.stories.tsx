import type { Meta } from "@storybook/nextjs";

import { Choice, Choices } from "./choices";

const meta = {
  component: Choices,
  parameters: {},
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
