import Image from "next/image";
import type { FC } from "react";

import type { CreationIllust } from "@/entities/creation/models/creation";

import { styles } from "./illustration-image.css";

type IllustrationImageProps = Pick<CreationIllust, "illust" | "title">;

export const IllustrationImage: FC<IllustrationImageProps> = ({
  illust,
  title,
}) => {
  return (
    <div className={styles.container}>
      <Image
        alt={`イラスト作品「${title}」`}
        className={styles.image}
        height={illust.height}
        src={illust.src}
        width={illust.width}
      />
    </div>
  );
};
