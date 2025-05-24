import { AboutMe } from "@/features/home/about-me";
import { AboutSite } from "@/features/home/about-site";
import { Col, Container } from "@/shared/design-system/layout";
import { FadeIn } from "@/shared/design-system/ui";

import { HeaderFooterTemplate } from "@/components/header-footer-template";

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
