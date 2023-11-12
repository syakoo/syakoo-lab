"use client";

import Image from "next/image";

import { api } from "@/api";
import { Col, Row } from "@/design-system/layout";
import { H3, Link } from "@/design-system/ui";
import { HeartButton } from "@/features/arts/_shared/HeartButton";
import type { ArtMeta } from "@/features/arts/types";

import { artGalleryItemStyles } from "./ArtGalleryItem.css";

type ArtGalleryItemProps = {
  meta: ArtMeta;
};

export const ArtGalleryItem: React.FC<ArtGalleryItemProps> = ({ meta }) => {
  const handleClickHeartButton = () =>
    void api.incrementArtFav({ id: meta.id });

  return (
    <Col as="article" gap="50">
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
      <Row align="center" justify="spaceBetween">
        <div className={artGalleryItemStyles.titleWrapper}>
          <H3 size="75">{meta.title}</H3>
        </div>
        <div className={artGalleryItemStyles.heartButtonWrapper}>
          <HeartButton onClick={handleClickHeartButton} />
        </div>
      </Row>
    </Col>
  );
};
