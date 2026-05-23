import { Container } from "../shared/design-system/layout/container/container";
import { Col } from "../shared/design-system/layout/flex/flex";
import { FadeIn } from "../shared/design-system/ui/fade-in/fade-in";
import { AboutMe, AboutSite } from "../widgets/home";
import { HeaderFooterTemplate } from "../widgets/layout";

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
