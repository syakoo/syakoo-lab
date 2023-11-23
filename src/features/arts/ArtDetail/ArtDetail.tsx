"use client";

import Image from "next/image";

import { Col, Row } from "@/design-system/layout";
import { H2, Text } from "@/design-system/ui";
import { HeartButton } from "@/features/arts/_shared/HeartButton/HeartButton";
import { resolveArtBody } from "@/features/arts/models/bodyResolver";
import { SerializedArt } from "@/features/arts/models/types";

import { artDetailStyles } from "./ArtDetail.css";
import { useFav } from "./useFav";

type ArtDetailProps = {
  art: SerializedArt;
};

export const ArtDetail: React.FC<ArtDetailProps> = ({ art }) => {
  const { fav, incrementFav } = useFav(art.head.id);
  const MDXComponent = resolveArtBody(art.body).data;

  const handleClickHeartButton = () => void incrementFav();

  return (
    <article className={artDetailStyles.root}>
      <div className={artDetailStyles.imageWrapper}>
        <Image
          alt={art.head.title}
          className={artDetailStyles.image}
          height={art.head.size.height}
          src={art.head.imgUrl}
          width={art.head.size.width}
        />
      </div>
      <div className={artDetailStyles.body}>
        <Row align="flexEnd" gap="50">
          <div className={artDetailStyles.heartButtonWrapper}>
            <HeartButton onClick={handleClickHeartButton} />
          </div>
          <div>{fav !== null && <Text color="secondary">{fav}</Text>} </div>
        </Row>
        <div>
          <H2 size="400">{art.head.title}</H2>
          <Col>
            <div>
              <MDXComponent
                components={{
                  p: (props: { children: React.ReactNode }) => (
                    <Text color="secondary" size="75">
                      {props.children}
                    </Text>
                  ),
                }}
              />
            </div>
            <div>
              <Row gap="50">
                {art.head.tags.map((tag) => (
                  <Text key={tag} color="secondary" size="50">
                    #{tag}
                  </Text>
                ))}
              </Row>
              <Text color="secondary" size="50">
                {art.head.published}
              </Text>
            </div>
          </Col>
        </div>
      </div>
    </article>
  );
};
