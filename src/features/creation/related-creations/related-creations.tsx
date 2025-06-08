import type { FC } from "react";

import { CreationCard } from "@/entities/creation/creation-card";
import type { CreationSummary } from "@/entities/creation/models/creation";
import { Col, Row } from "@/shared/design-system/layout";
import { H3, Link } from "@/shared/design-system/ui";

import { styles } from "./related-creations.css";

type RelatedCreationsProps = {
  /** 関連創作物一覧 */
  relatedCreations: CreationSummary[];
};

/**
 * 関連創作物一覧
 */
export const RelatedCreations: FC<RelatedCreationsProps> = ({
  relatedCreations,
}) => {
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
