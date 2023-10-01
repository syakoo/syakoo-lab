import { Col, Container } from "@/design-system/layout";
import { H2 } from "@/design-system/ui";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";

export const Works: React.FC = () => {
  return (
    <HeaderFooterTemplate>
      <main>
        <Container
          as="section"
          center
          paddingBottom="400"
          paddingX="200"
          size="100"
        >
          <Col gap="100">
            <H2>Works</H2>
            <div>TODO: works here...</div>
          </Col>
        </Container>
      </main>
    </HeaderFooterTemplate>
  );
};
