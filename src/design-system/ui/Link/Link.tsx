import React from "react";
import { linkStyle } from "./Link.css";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  colored?: boolean;
  underlined?: boolean;
  noHovered?: boolean;
};

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  colored = false,
  underlined = false,
  noHovered = false,
}) => {
  return (
    <a
      className={`${linkStyle({ colored, underlined, noHovered })}`}
      href={href}
    >
      {children}
    </a>
  );
};