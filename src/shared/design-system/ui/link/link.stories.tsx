import type { Meta } from "@storybook/nextjs";

import { Link } from "./link";

const meta = {
  component: Link,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Link>;

export default meta;

export const Default = () => {
  return <Link href="#">Default Link</Link>;
};

export const Variants = () => {
  return (
    <>
      <div>
        <Link colored href="#">
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
      <div>
        <Link href="#" noTransparent>
          no transparent Link
        </Link>
      </div>
      <div>
        <Link display="block" href="#">
          <div
            style={{
              border: "1px solid var(--color-brand-primary)",
              borderRadius: "var(--radius-100)",
            }}
          >
            Block Link
          </div>
        </Link>
      </div>
    </>
  );
};
