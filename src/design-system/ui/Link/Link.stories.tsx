import type { Meta } from "@storybook/react";
import { Link } from ".";

const meta = {
  component: Link,
  tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export default meta;

export const Default = () => {
  return (
    <>
      <Link href="#">Default Link</Link>
    </>
  );
};

export const Variants = () => {
  return (
    <>
      <div>
        <Link href="#" colored>
          Colored Link
        </Link>
      </div>
      <div>
        <Link href="#" underlined>
          Underlined Link
        </Link>
      </div>
      <div>
        <Link href="#" noHovered>
          no hovered Link
        </Link>
      </div>
    </>
  );
};
