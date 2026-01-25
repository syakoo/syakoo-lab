import Image from "next/image";
import type { FC } from "react";

import type { CreationIllust } from "@/entities/creation/models/creation";
import {
  ImageLightboxRoot,
  ImageLightboxTrigger,
} from "@/shared/design-system/ui/image-lightbox/image-lightbox";

type IllustrationImageProps = Pick<CreationIllust, "illust" | "title">;

export const IllustrationImage: FC<IllustrationImageProps> = ({
  illust,
  title,
}) => {
  const altText = `イラスト作品「${title}」`;

  return (
    <div className="flex max-md:-mx-200">
      <ImageLightboxRoot alt={altText} src={illust.src}>
        <ImageLightboxTrigger className="mx-auto">
          <Image
            alt={altText}
            className="h-auto max-w-full"
            height={illust.height}
            src={illust.src}
            width={illust.width}
          />
        </ImageLightboxTrigger>
      </ImageLightboxRoot>
    </div>
  );
};
