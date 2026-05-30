import NextLink from "next/link";
import type React from "react";

import { siteConfig } from "../../../config/site";
import { type LinkStyleVariants, linkStyle } from "./link.styles";

const siteOrigin = new URL(siteConfig.url).origin;

const isExternalHref = (href: string): boolean => {
  if (href.startsWith("/") || href.startsWith("#")) {
    return false;
  }
  if (!href.startsWith("http://") && !href.startsWith("https://")) {
    return false;
  }
  try {
    return new URL(href).origin !== siteOrigin;
  } catch {
    return false;
  }
};

type LinkProps = {
  href: string;
  children: React.ReactNode;
} & Partial<LinkStyleVariants> &
  Omit<React.ComponentPropsWithoutRef<"a">, "href" | "children">;

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  colored = false,
  underlined = false,
  noHovered = false,
  noTransparent = false,
  display,
  target,
  rel,
  ...otherProps
}) => {
  const external = isExternalHref(href);

  return (
    <NextLink
      className={linkStyle({
        colored,
        underlined,
        noHovered,
        noTransparent,
        display,
      })}
      href={href}
      rel={rel ?? (external ? "noopener noreferrer" : undefined)}
      target={target ?? (external ? "_blank" : undefined)}
      {...otherProps}
    >
      {children}
    </NextLink>
  );
};
