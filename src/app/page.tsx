import { Col, Container } from "@/design-system/layout";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { AboutMeSection } from "@/features/home/AboutMeSection";
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
          <AboutMeSection />
        </Container>
      </Col>
    </HeaderFooterTemplate>
  );
};

export default HomePage;
