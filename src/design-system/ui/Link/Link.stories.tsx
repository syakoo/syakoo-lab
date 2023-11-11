import type { Meta } from "@storybook/react";

import { tokens } from "@/design-system/tokens";

import { Link } from ".";

const meta = {
  component: Link,
  tags: ["autodocs"],
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
        <Link display="block" href="#">
          <div
            style={{
              border: `1px solid ${tokens.colors.brand.primary}`,
              borderRadius: tokens.radii[100],
            }}
          >
            Block Link
          </div>
        </Link>
      </div>
    </>
  );
};
