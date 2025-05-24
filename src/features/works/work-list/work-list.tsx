import { works } from "@/contents/works/works";
import { Col } from "@/shared/design-system/layout";
import { H2, FadeIn } from "@/shared/design-system/ui";

import { WorkBlock } from "./work-block";

export const WorkList: React.FC = () => {
  return (
    <section>
      <Col gap="200">
        <H2>Works</H2>
        <Col as="ul" gap="300">
          {works.map((work, i) => (
            <FadeIn key={work.name} as="li" delaySec={0.1 * i}>
              <WorkBlock work={work} />
            </FadeIn>
          ))}
        </Col>
      </Col>
    </section>
  );
};
