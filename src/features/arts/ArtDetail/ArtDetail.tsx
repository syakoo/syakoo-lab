"use client";

import Image from "next/image";

import { Col, Row } from "@/design-system/layout";
import { H2, Text } from "@/design-system/ui";
import { HeartButton } from "@/features/arts/_shared/HeartButton/HeartButton";
import { Art } from "@/features/arts/types";
import { resolveMDXAsComponent } from "@/features/mdx/resolveMDXAsComponent";

import { artDetailStyles } from "./ArtDetail.css";
import { useFav } from "./useFav";

type ArtDetailProps = {
  art: Art;
};

export const ArtDetail: React.FC<ArtDetailProps> = ({ art }) => {
  const { fav, incrementFav } = useFav(art.meta.id);
  const MDXComponent = resolveMDXAsComponent(art.serializedBody);

  const handleClickHeartButton = () => void incrementFav();

  return (
    <article className={artDetailStyles.root}>
      <div className={artDetailStyles.imageWrapper}>
        <Image
          alt={art.meta.title}
          className={artDetailStyles.image}
          height={art.meta.size.height}
          src={art.meta.imgUrl}
          width={art.meta.size.width}
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
          <H2 size="400">{art.meta.title}</H2>
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
                {art.meta.tags.map((tag) => (
                  <Text key={tag} color="secondary" size="50">
                    #{tag}
                  </Text>
                ))}
              </Row>
              <Text color="secondary" size="50">
                {art.meta.published}
              </Text>
            </div>
          </Col>
        </div>
      </div>
    </article>
  );
};
