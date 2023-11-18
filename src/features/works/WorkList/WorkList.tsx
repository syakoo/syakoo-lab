import { works } from "@/contents/works/works";
import { Col, Container } from "@/design-system/layout";
import { H2, FadeIn } from "@/design-system/ui";

import { WorkBlock } from "./WorkBlock";

export const WorkList: React.FC = () => {
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
          {works.map((work, i) => (
            <FadeIn key={work.name} as="li" delaySec={0.1 * i}>
              <WorkBlock work={work} />
            </FadeIn>
          ))}
        </Col>
      </Col>
    </Container>
  );
};
