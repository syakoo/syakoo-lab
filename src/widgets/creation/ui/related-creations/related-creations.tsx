import { notFound } from "next/navigation";

import { CreationCard } from "../../../../entities/creation";
import { Col, Row } from "../../../shared";
import { Link } from "../../../shared";
import { H3 } from "../../../shared";
import { readCreationSummaries } from "../../models/creation-reader/read-creation";

import { getRelatedCreations } from "./get-related-creations";

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
      <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
