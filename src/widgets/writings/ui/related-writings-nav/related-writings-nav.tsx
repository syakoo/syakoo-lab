import { Col } from "../../../shared";
import { H3 } from "../../../shared";

import { findRelatedWritingHeads } from "./find-related-writing-heads";
import { WritingLink } from "./writing-link/writing-link";

type RelatedWritingsNavProps = {
  id: string;
};

export const RelatedWritingsNav = async ({ id }: RelatedWritingsNavProps) => {
  const heads = await findRelatedWritingHeads(id);

  if (heads.length === 0) {
    return null;
  }

  return (
    <Col as="nav" gap="200">
      <H3>Related Writings</H3>
      <Col as="ul">
        {heads.map((head) => (
          <li key={head.id}>
            <WritingLink head={head} />
          </li>
        ))}
      </Col>
    </Col>
  );
};
