import { useMemo } from "react";

import { Row } from "@/design-system/layout";
import { Link, Text } from "@/design-system/ui";

import { linkCardStyles } from "./LinkCard.css";

export type LinkCardProps = {
  imgSrc: string;
  title: string;
  url: string;
  description?: string;
  faviconSrc: string;
};

export const LinkCard: React.FC<LinkCardProps> = ({
  imgSrc,
  title,
  url,
  description,
  faviconSrc,
}) => {
  const domain = useMemo(() => {
    return url.split("/")[2];
  }, [url]);

  return (
    <Link display="block" href={url}>
      <div className={linkCardStyles.root}>
        <div className={linkCardStyles.body}>
          <div className={linkCardStyles.textContainer({ lines: 2 })}>
            <Text as="span" weight="bold">
              {title}
            </Text>
          </div>
          <div className={linkCardStyles.textContainer({ lines: 1 })}>
            <Text as="span" color="tertiary" size="50">
              {description}
            </Text>
          </div>
          <Row align="center" gap="50">
            {/* eslint-disable @next/next/no-img-element */}
            <img alt="" height={14} src={faviconSrc} width={14} />
            <Text as="span" color="secondary" size="50">
              {domain}
            </Text>
          </Row>
        </div>

        <div className={linkCardStyles.thumbnailWrapper}>
          {/* eslint-disable @next/next/no-img-element */}
          <img alt={title} className={linkCardStyles.thumbnail} src={imgSrc} />
        </div>
      </div>
    </Link>
  );
};
