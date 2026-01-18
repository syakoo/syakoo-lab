import Image from "next/image";
import type { FC } from "react";

import type { CreationWebapp } from "@/entities/creation/models/creation";

type WebappLogoProps = Pick<CreationWebapp, "logo" | "title">;

export const WebappLogo: FC<WebappLogoProps> = ({ logo, title }) => {
  return (
    <Image
      alt={`${title}のロゴ`}
      className="h-auto w-[64px] max-w-full rounded-100"
      height={logo.height}
      src={logo.src}
      width={logo.width}
    />
  );
};
