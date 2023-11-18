import { Col, Container } from "@/design-system/layout";
import { H2, FadeIn } from "@/design-system/ui";
import type { ArtMeta } from "@/features/arts/types";

import { ArtGalleryItem } from "./ArtGalleryItem";
import { artListStyles } from "./ArtList.css";

type ArtListProps = {
  metas: ArtMeta[];
};

export const ArtList: React.FC<ArtListProps> = ({ metas }) => {
  return (
    <Container
      as="section"
      center
      paddingBottom="400"
      paddingX="200"
      size="100"
    >
      <Col gap="200">
        <H2>Arts</H2>
        <ul className={artListStyles.listContainer}>
          {metas.map((meta, i) => (
            <FadeIn key={meta.id} as="li" delaySec={0.05 * i}>
              <ArtGalleryItem meta={meta} />
            </FadeIn>
          ))}
        </ul>
      </Col>
    </Container>
  );
};
