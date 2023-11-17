import { HeaderFooterTemplate } from "@/components/HeaderFooterTemplate";
import { Col, Container } from "@/design-system/layout";
import { FadeIn } from "@/design-system/ui";
import { AboutMe } from "@/features/home/AboutMe";
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
        <Container center paddingBottom="400" paddingX="200" size="100">
          <FadeIn delaySec={0.1}>
            <AboutMe />
          </FadeIn>
        </Container>
      </Col>
    </HeaderFooterTemplate>
  );
};

export default HomePage;
