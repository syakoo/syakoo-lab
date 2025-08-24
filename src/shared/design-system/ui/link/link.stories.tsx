import type { Meta } from "@storybook/nextjs";

import { theme } from "@/shared/design-system/theme.css";

import { Link } from ".";

const meta = {
  component: Link,
  tags: ["autodocs"],
  parameters: { testLevel: "snapshot" },
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
              border: `1px solid ${theme.color.brand.primary}`,
              borderRadius: theme.radius[100],
            }}
          >
            Block Link
          </div>
        </Link>
      </div>
    </>
  );
};
