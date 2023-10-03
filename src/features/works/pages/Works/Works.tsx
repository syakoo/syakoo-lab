import { WorkBlock } from "./WorkBlock";
import { works } from "@/contents/works/works";
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
          <Col gap="200">
            <H2>Works</H2>
            <Col as="ul" gap="200">
              {works.map((work) => (
                <WorkBlock key={work.name} work={work} />
              ))}
            </Col>
          </Col>
        </Container>
      </main>
    </HeaderFooterTemplate>
  );
};
