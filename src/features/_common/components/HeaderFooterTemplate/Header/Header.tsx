import React from "react";
import { Center, Container, Row } from "@/design-system/layout";
import { Link } from "@/design-system/ui";
import { SyakooLabText } from "@/features/_common/components/SyakooLabText";

export const Header: React.FC = () => {
  return (
    <Center>
      <Container as="header" paddingX="200" paddingY="300" size="200">
        <Row align="center" justify="spaceBetween" wrap>
          <Link href="/">
            <SyakooLabText />
          </Link>
          <Row align="center" as="nav">
            <Link href="/writings">Writings</Link>
            <Link href="/works">Works</Link>
            <Link href="/arts">Arts</Link>
          </Row>
        </Row>
      </Container>
    </Center>
  );
};
