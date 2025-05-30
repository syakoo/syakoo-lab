import type { ArtHead } from "@/features/arts/_models/types";
import { Col, Container } from "@/shared/design-system/layout";
import { H2, FadeIn } from "@/shared/design-system/ui";

import { ArtGalleryItem } from "./art-gallery-item";
import { artListStyles } from "./art-list.css";

type ArtListProps = {
  heads: ArtHead[];
};

export const ArtList: React.FC<ArtListProps> = ({ heads }) => {
  return (
    <Container as="section" center paddingX="200" paddingY="400" size="100">
      <Col gap="200">
        <H2>Arts</H2>
        <ul className={artListStyles.listContainer}>
          {heads.map((head, i) => (
            <FadeIn key={head.id} as="li" delaySec={0.05 * i}>
              <ArtGalleryItem head={head} />
            </FadeIn>
          ))}
        </ul>
      </Col>
    </Container>
  );
};
