import { CreationCard } from "@/entities/creation/creation-card";
import { creationPaths } from "@/entities/creation/paths";
import { readCreationSummaries } from "@/features/creation/creation-reader/read-creation";
import { Col } from "@/shared/design-system/layout";
import { FadeIn, H2, Link } from "@/shared/design-system/ui";

import { creationListStyles } from "./creation-list.css";

export const CreationList = async () => {
  const creationSummaries = await readCreationSummaries();

  return (
    <section>
      <Col gap="200">
        <H2>Creations</H2>
        <ul className={creationListStyles.listContainer}>
          {creationSummaries.map((creation, i) => (
            <FadeIn key={creation.id} as="li" delaySec={0.05 * i}>
              <Link display="block" href={creationPaths.detail(creation.id)}>
                <CreationCard {...creation} />
              </Link>
            </FadeIn>
          ))}
        </ul>
      </Col>
    </section>
  );
};
