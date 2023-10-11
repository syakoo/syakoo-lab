import type { UserLink } from "../types";
import { linkImageStyle, linkStyle } from "./Links.css";
import { Row } from "@/design-system/layout";
import { Link } from "@/design-system/ui";

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
              <img
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
