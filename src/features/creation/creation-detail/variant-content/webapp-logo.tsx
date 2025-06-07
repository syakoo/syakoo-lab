import Image from "next/image";
import type { FC } from "react";

import type { CreationWebapp } from "@/entities/creation/models/creation";

import { styles } from "./webapp-logo.css";

type WebappLogoProps = Pick<CreationWebapp, "logo" | "title">;

export const WebappLogo: FC<WebappLogoProps> = ({ logo, title }) => {
  return (
    <Image
      alt={`${title}のロゴ`}
      className={styles.logo}
      height={logo.height}
      src={logo.src}
      width={logo.width}
    />
  );
};
