import { workBlockArticleStyle, workBlockImageStyle } from "./WorkBlock.css";
import { Col, Row } from "@/design-system/layout";
import { H3, Link, Span } from "@/design-system/ui";
import type { Work } from "@/features/works/types/work";

type WorkBlockProps = {
  work: Work;
};

export const WorkBlock: React.FC<WorkBlockProps> = ({ work }) => {
  return (
    <article className={workBlockArticleStyle}>
      <Col>
        <Row>
          <div>
            <img
              alt=""
              className={workBlockImageStyle}
              height={work.imageSrc.height}
              src={work.imageSrc.src}
              width={work.imageSrc.width}
            />
          </div>
          <div>
            <H3 size="200">{work.name}</H3>
            <div>
              <Span color="secondary" size="50">
                repo:{" "}
                <Link href={work.repositoryUrl} underlined>
                  {work.repositoryUrl}
                </Link>
              </Span>
            </div>
          </div>
        </Row>
        <div>{work.description}</div>
      </Col>
    </article>
  );
};
