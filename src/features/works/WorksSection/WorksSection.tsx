import { WorkBlock } from "./WorkBlock";
import { works } from "@/contents/works/works";
import { Col, Container } from "@/design-system/layout";
import { H2 } from "@/design-system/ui";

export const WorksSection: React.FC = () => {
  return (
    <Container
      as="section"
      center
      paddingBottom="400"
      paddingX="200"
      size="100"
    >
      <Col gap="200">
        <H2>Works</H2>
        <Col as="ul" gap="100">
          {works.map((work) => (
            <li key={work.name}>
              <WorkBlock work={work} />
            </li>
          ))}
        </Col>
      </Col>
    </Container>
  );
};
