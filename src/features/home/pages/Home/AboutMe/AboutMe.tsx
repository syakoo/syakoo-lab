import { aboutMeImageStyle } from "./AboutMe.css";
import meImg from "./me.jpg";
import { Col, Row } from "@/design-system/layout";
import { Text } from "@/design-system/ui";

export const AboutMe: React.FC = () => {
  return (
    <Col gap="100">
      <Row>
        <img
          alt="me"
          className={aboutMeImageStyle}
          height={meImg.height}
          src={meImg.src}
          width={meImg.width}
        />
        <Col gap="100">
          <Text as="h3" size="400" weight="bold">
            syakoo
          </Text>
          {/* TODO: Links */}
        </Col>
      </Row>
      <Text>
        気分駆動フロントエンドエンジニア。言語・フレームワーク仕様よりは設計やアルゴリズムなどの抽象的な部分に興味があります。
      </Text>
    </Col>
  );
};
