import type { RecipeVariants } from "@vanilla-extract/recipes";
import NextLink from "next/link";
import type React from "react";

import { linkStyle } from "./Link.css";

type LinkProps = {
  href: string;
  children: React.ReactNode;
} & Partial<RecipeVariants<typeof linkStyle>> &
  Omit<React.ComponentPropsWithoutRef<"a">, "href" | "children">;

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  colored = false,
  underlined = false,
  noHovered = false,
  display,
  ...otherProps
}) => {
  return (
    <NextLink
      className={`${linkStyle({ colored, underlined, noHovered, display })}`}
      href={href}
      {...otherProps}
    >
      {children}
    </NextLink>
  );
};
