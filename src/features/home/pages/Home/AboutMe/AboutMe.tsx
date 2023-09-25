import { aboutMeImageStyle } from "./AboutMe.css";
import meImg from "./me.jpg";
import { Col, Row } from "@/design-system/layout";
import { Text } from "@/design-system/ui";
import { resolveImageProps } from "@/libs/astro-image/resolveImageProps";

export const AboutMe: React.FC = () => {
  return (
    <Col gap="200">
      <Row gap="100">
        <img
          alt="me"
          className={aboutMeImageStyle}
          {...resolveImageProps(meImg)}
        />
        <div>
          <Text as="h3" size="400" weight="bold">
            syakoo
          </Text>
          {/* Links */}
        </div>
      </Row>
      <Text>
        気分駆動フロントエンドエンジニア。言語・フレームワーク仕様よりは設計やアルゴリズムなどの抽象的な部分に興味があります。
      </Text>
    </Col>
  );
};
