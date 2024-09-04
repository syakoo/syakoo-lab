import Image from "next/image";

import { aboutMeConfig } from "@/contents/about-me/config";
import { Col, Row } from "@/design-system/layout";
import { H2, Text } from "@/design-system/ui";

import { aboutMeImageStyle } from "./about-me.css";
import { Links } from "./links";

export const AboutMe: React.FC = () => {
  const { imageSrc, name, bio, links } = aboutMeConfig;

  return (
    <Col as="section" gap="100">
      <H2>About Me</H2>
      <Col gap="200">
        <Row gap="200">
          <Image
            alt="me"
            className={aboutMeImageStyle}
            height={imageSrc.height}
            src={imageSrc.src}
            width={imageSrc.width}
          />
          <Col gap="100">
            <Text as="h3" size="400" weight="bold">
              {name}
            </Text>
            <Links links={links} />
          </Col>
        </Row>
        <Text>{bio}</Text>
      </Col>
    </Col>
  );
};
