"use client";

import { usePathname } from "next/navigation";
import type React from "react";

import { creationPaths } from "../../../../../entities/creation";
import { SyakooLabText } from "../../../../entities";
import { writingPaths } from "../../../../../entities/writing";
import { Center } from "../../../../shared";
import { Container } from "../../../../shared";
import { Row } from "../../../../shared";
import { Link } from "../../../../shared";
import { Span } from "../../../../shared";

export const headerHeightPx = 74;

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
        <div className="flex h-[74px] flex-wrap items-center justify-between gap-100 bg-background-primary/80 px-200 backdrop-blur-sm">
          <Link aria-label="Go to the homepage" href="/">
            <SyakooLabText />
          </Link>
          <Row align="center" aria-label="メインナビゲーション" as="nav">
            <NavLink href={writingPaths.list()}>Writings</NavLink>
            <NavLink href={creationPaths.list()}>Creations</NavLink>
          </Row>
        </div>
      </Container>
    </Center>
  );
};
