import { useMemo } from "react";

import { Link } from "../../../../../../shared/design-system/ui/link/link";
import { Text } from "../../../../../../shared/design-system/ui/text/text";

export type LinkCardProps = {
  title: string;
  url: string;
  description?: string;
};

export const LinkCard: React.FC<LinkCardProps> = ({
  title,
  url,
  description,
}) => {
  const domain = useMemo(() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }, [url]);

  return (
    <Link display="block" href={url}>
      <div className="my-200 overflow-hidden rounded-100 border border-background-secondary bg-background-primary">
        <div className="flex flex-col gap-50 px-100 py-200">
          <div className="line-clamp-2">
            <Text as="span" weight="bold">
              {title}
            </Text>
          </div>
          {description ? (
            <div className="line-clamp-1">
              <Text as="span" color="secondary" size="50">
                {description}
              </Text>
            </div>
          ) : null}
          <Text as="span" color="secondary" size="50">
            {domain}
          </Text>
        </div>
      </div>
    </Link>
  );
};
