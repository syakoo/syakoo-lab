"use client";

import Image from "next/image";

import { api } from "@/api/reaction-system";
import type { ArtHead } from "@/features/arts/_models/types";
import { convertArtIdToReactionId } from "@/features/arts/_shared/art-id-to-reaction-id";
import { HeartButton } from "@/features/arts/_shared/heart-button";
import { artPaths } from "@/features/arts/config/paths";
import { Col, FlexItem, Row } from "@/shared/design-system/layout";
import { H3, Link } from "@/shared/design-system/ui";

import { artGalleryItemStyles } from "./art-gallery-item.css";

type ArtGalleryItemProps = {
  head: ArtHead;
};

export const ArtGalleryItem: React.FC<ArtGalleryItemProps> = ({ head }) => {
  const handleClickHeartButton = () =>
    void api.postReactionIncrement(convertArtIdToReactionId(head.id), {
      likes: 1,
    });

  return (
    <Col as="article" gap="50">
      <div>
        <Link display="block" href={artPaths.detail(head.id)}>
          <Image
            alt={head.title}
            className={artGalleryItemStyles.image}
            height={head.size.height}
            src={head.imgUrl}
            width={head.size.width}
          />
        </Link>
      </div>
      <Row align="center" justify="spaceBetween">
        <div className={artGalleryItemStyles.titleWrapper}>
          <H3 size="75">{head.title}</H3>
        </div>
        <FlexItem shrink={0}>
          <div className={artGalleryItemStyles.heartButtonWrapper}>
            <HeartButton onClick={handleClickHeartButton} />
          </div>
        </FlexItem>
      </Row>
    </Col>
  );
};
