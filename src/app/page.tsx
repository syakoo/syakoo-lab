import { Col, Container } from "@/design-system/layout";
import { FadeIn } from "@/design-system/ui";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import { AboutMeSection } from "@/features/home/AboutMeSection";
import { Home } from "@/features/home/Home";

const HomePage = () => {
  return (
    <HeaderFooterTemplate>
      <Col align="stretch" gap="500">
        <Container as="main" center paddingTop="400" paddingX="200" size="100">
          <FadeIn>
            <Home />
          </FadeIn>
        </Container>
        <Container
          as="section"
          center
          paddingBottom="400"
          paddingX="200"
          size="100"
        >
          <FadeIn delaySec={0.1}>
            <AboutMeSection />
          </FadeIn>
        </Container>
      </Col>
    </HeaderFooterTemplate>
  );
};

export default HomePage;
