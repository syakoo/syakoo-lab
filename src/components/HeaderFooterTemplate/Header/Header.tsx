"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { SyakooLabText } from "@/components/SyakooLabText";
import { Center, Container, Row } from "@/design-system/layout";
import { Link, Span } from "@/design-system/ui";
import { artPaths } from "@/features/arts/config/paths";
import { workPaths } from "@/features/works/config/paths";
import { writingPaths } from "@/features/writings/config/paths";

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
          <Link aria-label="Go to the homepage" href="/">
            <SyakooLabText />
          </Link>
          <Row align="center" as="nav">
            <NavLink href={writingPaths.list()}>Writings</NavLink>
            <NavLink href={workPaths.list()}>Works</NavLink>
            <NavLink href={artPaths.list()}>Arts</NavLink>
          </Row>
        </Row>
      </Container>
    </Center>
  );
};
