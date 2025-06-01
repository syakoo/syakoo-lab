import Image from "next/image";
import type { FC } from "react";

import { creationTypes } from "@/entities/creation/creation-type";
import type { Creation } from "@/entities/creation/models/creation";
import { Icon } from "@/shared/design-system/icons";
import { Col } from "@/shared/design-system/layout";
import { Text } from "@/shared/design-system/ui";

import * as styles from "./creation-card.css";

export type CreationCardProps = Pick<
  Creation,
  "type" | "title" | "thumbnailImage"
>;

export const CreationCard: FC<CreationCardProps> = ({
  type,
  title,
  thumbnailImage,
}) => {
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
          <div aria-label={type} className={styles.typeContainer}>
            <Icon name={creationTypes[type].icon} />
          </div>
        </div>
        <Text as="h3" color="primary" size="75" weight="bold">
          {title}
        </Text>
      </Col>
    </div>
  );
};
