import { Col, Container } from "@/design-system/layout";
import { H2 } from "@/design-system/ui";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { AboutMe } from "@/features/home/AboutMe";
import { Home } from "@/features/home/Home";

const HomePage = () => {
  return (
    <HeaderFooterTemplate>
      <Col align="stretch" gap="500">
        <Container as="main" center paddingTop="400" paddingX="200" size="100">
          <Home />
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

export default HomePage;
