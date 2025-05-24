"use client";

import { usePathname } from "next/navigation";
import type React from "react";

import { Center, Container, Row } from "@/design-system/layout";
import { Link, Span } from "@/design-system/ui";
import { SyakooLabText } from "@/entities/syakoo-lab-text";
import { artPaths } from "@/features/arts/config/paths";
import { workPaths } from "@/features/works/config/paths";
import { writingPaths } from "@/features/writings/config/paths";

import { headerStyle } from "./header.css";

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
      <Container as="header" size="200">
        <div className={headerStyle}>
          <Link aria-label="Go to the homepage" href="/">
            <SyakooLabText />
          </Link>
          <Row align="center" as="nav">
            <NavLink href={writingPaths.list()}>Writings</NavLink>
            <NavLink href={workPaths.list()}>Works</NavLink>
            <NavLink href={artPaths.list()}>Arts</NavLink>
          </Row>
        </div>
      </Container>
    </Center>
  );
};
