import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { Col, Container } from "@/design-system/layout";
import { FadeIn } from "@/design-system/ui";
import { AboutMeSection } from "@/features/home/AboutMeSection";
import { AboutSite } from "@/features/home/AboutSite";

const HomePage = () => {
  return (
    <HeaderFooterTemplate>
      <Col align="stretch" gap="500">
        <Container as="main" center paddingTop="400" paddingX="200" size="100">
          <FadeIn>
            <AboutSite />
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
