import Image from "next/image";
import type { FC } from "react";
import { match } from "ts-pattern";

import { creationTypes } from "@/entities/creation/creation-type/creation-type";
import type {
  CreationGame,
  CreationIllust,
  CreationWebapp,
} from "@/entities/creation/models/creation";
import { Icon } from "@/shared/design-system/icons/icon";
import { Col } from "@/shared/design-system/layout/flex/flex";
import { Text } from "@/shared/design-system/ui/text/text";

export type CreationCardProps =
  | Pick<CreationIllust, "type" | "title" | "illust">
  | Pick<CreationGame, "type" | "title" | "logo">
  | Pick<CreationWebapp, "type" | "title" | "logo">;

export const CreationCard: FC<CreationCardProps> = ({ ...creation }) => {
  const thumbnailImage = match(creation)
    .with({ type: "illust" }, (creation) => creation.illust)
    .with({ type: "game" }, (creation) => creation.logo)
    .with({ type: "webapp" }, (creation) => creation.logo)
    .exhaustive();

  return (
    <div className="relative w-full min-w-[150px]">
      <Col gap="50">
        <div className="relative aspect-square w-full overflow-hidden rounded-200">
          <Image
            alt=""
            className="object-cover transition-transform duration-300"
            fill
            src={thumbnailImage.src}
          />
          <div
            aria-label={creation.type}
            className="absolute right-50 bottom-50 flex size-[26px] items-center justify-center rounded-100 bg-background-primary p-50"
            role="img"
          >
            <Icon name={creationTypes[creation.type].icon} />
          </div>
        </div>
        <Text as="h3" color="primary" size="75" weight="bold">
          {creation.title}
        </Text>
      </Col>
    </div>
  );
};
