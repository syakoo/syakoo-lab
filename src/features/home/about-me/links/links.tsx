import Image from "next/image";

import type { UserLink } from "@/features/home/about-me/types";
import { Row } from "@/shared/design-system/layout/flex/flex";
import { Link } from "@/shared/design-system/ui/link/link";

import { linkImageStyle, linkStyle } from "./links.css";

type LinksProps = {
  links: UserLink[];
};

export const Links: React.FC<LinksProps> = ({ links }) => {
  return (
    <Row as="ul">
      {links.map((link) => (
        <li key={link.name}>
          <Link href={link.url}>
            <div className={linkStyle} title={link.name}>
              <Image
                alt={link.name}
                className={linkImageStyle}
                height={link.imageSrc.height}
                src={link.imageSrc.src}
                width={link.imageSrc.width}
              />
            </div>
          </Link>
        </li>
      ))}
    </Row>
  );
};
