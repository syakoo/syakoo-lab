"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { Center, Container, Row } from "@/design-system/layout";
import { Link, Span } from "@/design-system/ui";
import { SyakooLabText } from "@/features/_common/components/SyakooLabText";

const NavLink: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href,
}) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link href={href} noHovered={isActive}>
      <Span color={isActive ? "primary" : "secondary"}>{children}</Span>
    </Link>
  );
};

export const Header: React.FC = () => {
  return (
    <Center>
      <Container as="header" paddingX="200" paddingY="300" size="200">
        <Row align="center" justify="spaceBetween" wrap>
          <Link href="/">
            <SyakooLabText />
          </Link>
          <Row align="center" as="nav">
            <NavLink href="/writings">Writings</NavLink>
            <NavLink href="/works">Works</NavLink>
            <NavLink href="/arts">Arts</NavLink>
          </Row>
        </Row>
      </Container>
    </Center>
  );
};
