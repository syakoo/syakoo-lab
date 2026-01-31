import { useMemo } from "react";

import { Row } from "../../../../../shared/design-system/layout/flex/flex";
import { Link } from "../../../../../shared/design-system/ui/link/link";
import { Text } from "../../../../../shared/design-system/ui/text/text";

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
      <div className="my-200 flex justify-between gap-50 overflow-hidden rounded-100 border border-background-secondary bg-background-primary">
        <div className="flex flex-col gap-50 px-100 py-200">
          <div className="line-clamp-2">
            <Text as="span" weight="bold">
              {title}
            </Text>
          </div>
          <div className="line-clamp-1">
            <Text as="span" color="secondary" size="50">
              {description}
            </Text>
          </div>
          <Row align="center" gap="50">
            <img alt="" height={14} src={faviconSrc} width={14} />
            <Text as="span" color="secondary" size="50">
              {domain}
            </Text>
          </Row>
        </div>

        {imgSrc ? (
          <div className="min-w-[100px] max-w-[300px]">
            <img
              alt={title}
              className="m-0 h-full max-h-[128px] w-full shrink-0 object-cover"
              src={imgSrc}
            />
          </div>
        ) : null}
      </div>
    </Link>
  );
};
