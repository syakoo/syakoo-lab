import { AboutMe } from "./AboutMe";
import { Center, Col, Container } from "@/design-system/layout";
import { H2, Text } from "@/design-system/ui";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { SyakooLabLogoWithAnimation } from "@/features/common/components/SyakooLabLogoWithAnimation";

export const Home: React.FC = () => {
  return (
    <HeaderFooterTemplate>
      <Col align="stretch" gap="500">
        <Container as="main" center paddingTop="400" paddingX="200" size="100">
          <Col gap="200">
            <Center>
              <SyakooLabLogoWithAnimation height="140px" />
            </Center>
            <Center>
              <Text>
                このサイトは syakoo 個人のサイトです。
                作成したアプリやイラスト、記事を公開しています。
              </Text>
            </Center>
          </Col>
        </Container>
        <Container
          as="section"
          center
          paddingBottom="400"
          paddingX="200"
          size="100"
        >
          <Col gap="100">
            <H2>About Me</H2>
            <AboutMe />
          </Col>
        </Container>
      </Col>
    </HeaderFooterTemplate>
  );
};
