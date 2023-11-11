import Image from "next/image";

import { Col, Row } from "@/design-system/layout";
import { H3, Link } from "@/design-system/ui";
import type { ArtMeta } from "@/features/arts/types";

import { artGalleryItemStyles } from "./ArtGalleryItem.css";

type ArtGalleryItemProps = {
  meta: ArtMeta;
};

export const ArtGalleryItem: React.FC<ArtGalleryItemProps> = ({ meta }) => {
  return (
    <Col as="article">
      <div>
        <Link display="block" href={`/arts/${meta.id}`}>
          <Image
            alt={meta.title}
            className={artGalleryItemStyles.image}
            height={meta.size.height}
            src={meta.imgUrl}
            width={meta.size.width}
          />
        </Link>
      </div>
      <Row>
        <div className={artGalleryItemStyles.titleWrapper}>
          <H3 size="75">{meta.title}</H3>
        </div>
      </Row>
    </Col>
  );
};
