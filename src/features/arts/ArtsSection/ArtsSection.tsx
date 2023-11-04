import { ArtGalleryItem } from "./ArtGalleryItem";
import { artsSectionStyles } from "./ArtsSection.css";
import { Col, Container } from "@/design-system/layout";
import { H2, FadeIn } from "@/design-system/ui";
import type { ArtMeta } from "@/features/arts/types";

type ArtsSectionProps = {
  metas: ArtMeta[];
};

export const ArtsSection: React.FC<ArtsSectionProps> = ({ metas }) => {
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
        <ul className={artsSectionStyles.listContainer}>
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
