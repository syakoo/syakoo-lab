import Image from "next/image";
import { artSectionStyles } from "./ArtSection.css";
import { Col, Row } from "@/design-system/layout";
import { H2, Text } from "@/design-system/ui";
import { Art } from "@/features/arts/types";
import { resolveMDXAsComponent } from "@/features/mdx/resolveMDXAsComponent";

type ArtSectionProps = {
  art: Art;
};

export const ArtSection: React.FC<ArtSectionProps> = ({ art }) => {
  const MDXComponent = resolveMDXAsComponent(art.serializedBody);

  return (
    <article className={artSectionStyles.root}>
      <div className={artSectionStyles.imageWrapper}>
        <Image
          alt={art.meta.title}
          className={artSectionStyles.image}
          height={art.meta.size.height}
          src={art.meta.imgUrl}
          width={art.meta.size.width}
        />
      </div>
      <div className={artSectionStyles.body}>
        <div>heart</div>
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