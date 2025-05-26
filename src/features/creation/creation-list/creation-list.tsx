import { CreationCard } from "@/entities/creation/creation-card";
import type { Creation } from "@/entities/creation/models/creation";
import { Col } from "@/shared/design-system/layout";
import { FadeIn, H2 } from "@/shared/design-system/ui";

import { creationListStyles } from "./creation-list.css";

type CreationListProps = {
  creations: Pick<Creation, "id" | "type" | "title" | "thumbnailSrc">[];
};

export const CreationList: React.FC<CreationListProps> = ({ creations }) => {
  return (
    <section>
      <Col gap="200">
        <H2>Creations</H2>
        <ul className={creationListStyles.listContainer}>
          {creations.map((creation, i) => (
            <FadeIn key={creation.id} as="li" delaySec={0.05 * i}>
              <CreationCard
                thumbnailSrc={creation.thumbnailSrc}
                title={creation.title}
                type={creation.type}
              />
            </FadeIn>
          ))}
        </ul>
      </Col>
    </section>
  );
};
