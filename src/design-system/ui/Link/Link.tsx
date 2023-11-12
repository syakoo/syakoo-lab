import type { RecipeVariants } from "@vanilla-extract/recipes";
import NextLink from "next/link";
import React from "react";

import { linkStyle } from "./Link.css";

type LinkProps = {
  href: string;
  children: React.ReactNode;
} & Partial<RecipeVariants<typeof linkStyle>>;

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  colored = false,
  underlined = false,
  noHovered = false,
  display,
}) => {
  return (
    <NextLink
      className={`${linkStyle({ colored, underlined, noHovered, display })}`}
      href={href}
    >
      {children}
    </NextLink>
  );
};
