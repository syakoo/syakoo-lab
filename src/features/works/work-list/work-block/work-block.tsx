import { format } from "date-fns";
import Image from "next/image";

import type { Work } from "@/contents/works/types";
import { FlexItem, Row } from "@/shared/design-system/layout";
import { H3, Link, Span } from "@/shared/design-system/ui";

import { workBlockStyle } from "./work-block.css";

type WorkBlockProps = {
  work: Work;
};

const formatDate = (dateString: string) =>
  format(new Date(dateString), "yyyy-MM-dd");
const formatRepositoryUrl = (url: string) =>
  url.replace("https://github.com/", "");

export const WorkBlock: React.FC<WorkBlockProps> = ({ work }) => {
  return (
    <Row align="flexStart" as="article" gap="100">
      <div className={workBlockStyle.imageWrapper}>
        <Image
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
          <div>
            <div>{work.description}</div>
            <Row gap="25">
              <Span color="secondary" size="50">
                released: {formatDate(work.releasedAt)}, repo:{" "}
                <Link href={work.repositoryUrl} underlined>
                  {formatRepositoryUrl(work.repositoryUrl)}
                </Link>
              </Span>
            </Row>
          </div>
        </div>
      </FlexItem>
    </Row>
  );
};
