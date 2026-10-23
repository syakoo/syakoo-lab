import type React from "react";
import { Link as WakuLink } from "waku";
import type { LinkProps as WakuLinkProps } from "waku/router/client";

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
  const className = linkStyle({
    colored,
    underlined,
    noHovered,
    noTransparent,
    display,
  });

  // NOTE: Waku のルーターはハッシュを decode せずに id を探すため、日本語 id の見出しへ移動できない
  if (href.startsWith("#")) {
    return (
      <a className={className} href={href} {...otherProps}>
        {children}
      </a>
    );
  }

  return (
    <WakuLink
      className={className}
      rel={rel ?? (external ? "noopener noreferrer" : undefined)}
      target={target ?? (external ? "_blank" : undefined)}
      // NOTE: `pages.gen.ts` があるとルートの文字列リテラル型になるため
      to={href as WakuLinkProps["to"]}
      {...otherProps}
    >
      {children}
    </WakuLink>
  );
};
