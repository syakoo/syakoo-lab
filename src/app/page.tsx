import { AboutMe } from "@/features/home/about-me";
import { AboutSite } from "@/features/home/about-site";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template";
import { Col, Container } from "@/shared/design-system/layout";
import { FadeIn } from "@/shared/design-system/ui";

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
