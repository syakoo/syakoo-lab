import Image from "next/image";
import type { FC } from "react";
import { match } from "ts-pattern";

import { creationTypes } from "@/entities/creation/creation-type";
import type {
  CreationIllust,
  CreationGame,
  CreationWebapp,
} from "@/entities/creation/models/creation";
import { Icon } from "@/shared/design-system/icons";
import { Col } from "@/shared/design-system/layout";
import { Text } from "@/shared/design-system/ui";

import * as styles from "./creation-card.css";

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
    <div className={styles.root}>
      <Col gap="50">
        <div className={styles.imageContainer}>
          <Image
            alt=""
            className={styles.image}
            fill
            src={thumbnailImage.src}
          />
          <div aria-label={creation.type} className={styles.typeContainer}>
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
