import React from "react";
import type { RecipeVariants } from "@vanilla-extract/recipes";
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
    <a
      className={`${linkStyle({ colored, underlined, noHovered, display })}`}
      href={href}
    >
      {children}
    </a>
  );
};
