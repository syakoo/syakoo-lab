import { aboutMeImageStyle } from "./AboutMe.css";
import { Links } from "./Links";
import { aboutMeConfig } from "./contents/aboutMeConfig";
import { Col, Row } from "@/design-system/layout";
import { Text } from "@/design-system/ui";

export const AboutMe: React.FC = () => {
  const { imageSrc, name, bio, links } = aboutMeConfig;

  return (
    <Col gap="100">
      <Row>
        <img
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
  );
};
