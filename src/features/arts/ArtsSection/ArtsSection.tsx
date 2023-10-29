import { ArtGalleryItem } from "./ArtGalleryItem";
import { artsSectionStyles } from "./ArtsSection.css";
import { Col, Container } from "@/design-system/layout";
import { H2 } from "@/design-system/ui";
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
          {metas.map((meta) => (
            <li key={meta.id}>
              <ArtGalleryItem meta={meta} />
            </li>
          ))}
        </ul>
      </Col>
    </Container>
  );
};
