import { notFound } from "next/navigation";

import { CreationCard } from "@/entities/creation/creation-card/creation-card";
import { readCreationSummaries } from "@/features/creation/creation-reader/read-creation";
import { Col, Row } from "@/shared/design-system/layout/flex/flex";
import { Link } from "@/shared/design-system/ui/link/link";
import { H3 } from "@/shared/design-system/ui/text/text";

import { getRelatedCreations } from "./get-related-creations";
import { styles } from "./related-creations.css";

type RelatedCreationsProps = {
  id: string;
};

export const RelatedCreations = async ({ id }: RelatedCreationsProps) => {
  const creationSummaries = await readCreationSummaries();
  const targetCreation = creationSummaries.find((c) => c.id === id);
  if (!targetCreation) notFound();

  const relatedCreations = getRelatedCreations(
    targetCreation,
    creationSummaries,
  );

  if (relatedCreations.length === 0) {
    return null;
  }

  return (
    <Col gap="100">
      <H3 size="400" weight="bold">
        Related Creations
      </H3>
      <div className={styles.carousel}>
        <Row as="ul" gap="100">
          {relatedCreations.map((creation) => (
            <li key={creation.id}>
              <Link href={`/creations/${creation.id}`}>
                <CreationCard {...creation} />
              </Link>
            </li>
          ))}
        </Row>
      </div>
    </Col>
  );
};
