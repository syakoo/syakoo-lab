import Image from "next/image";
import type { FC } from "react";

import type { CreationIllust } from "@/entities/creation/models/creation";

type IllustrationImageProps = Pick<CreationIllust, "illust" | "title">;

export const IllustrationImage: FC<IllustrationImageProps> = ({
  illust,
  title,
}) => {
  return (
    <div className="flex max-md:-mx-200">
      <Image
        alt={`イラスト作品「${title}」`}
        className="mx-auto h-auto max-w-full"
        height={illust.height}
        src={illust.src}
        width={illust.width}
      />
    </div>
  );
};
