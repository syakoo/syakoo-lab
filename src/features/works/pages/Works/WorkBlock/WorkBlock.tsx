import { workBlockStyle } from "./WorkBlock.css";
import { FlexItem, Row } from "@/design-system/layout";
import { H3, Link, Span } from "@/design-system/ui";
import type { Work } from "@/features/works/types/work";

type WorkBlockProps = {
  work: Work;
};

export const WorkBlock: React.FC<WorkBlockProps> = ({ work }) => {
  return (
    <Row align="center" as="article" gap="200">
      <div>
        <img
          alt=""
          className={workBlockStyle.image}
          height={work.imageSrc.height}
          src={work.imageSrc.src}
          width={work.imageSrc.width}
        />
      </div>
      <FlexItem grow={1}>
        <div className={workBlockStyle.body}>
          <H3 size="300">
            <Link href={work.siteUrl}>{work.name}</Link>
          </H3>
          <div>{work.description}</div>
          <Row gap="25">
            <Span color="secondary" size="50">
              {work.releasedAt} released, repo:{" "}
              <Link href={work.repositoryUrl} underlined>
                {work.repositoryUrl}
              </Link>
            </Span>
          </Row>
        </div>
      </FlexItem>
    </Row>
  );
};
