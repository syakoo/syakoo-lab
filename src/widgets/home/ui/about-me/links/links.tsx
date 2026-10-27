import type { UserLink } from "../../../../../contents/about-me/types";
import { Row } from "../../../../../shared/design-system/layout/flex/flex";
import { Link } from "../../../../../shared/design-system/ui/link/link";

type LinksProps = {
  links: UserLink[];
};

export const Links: React.FC<LinksProps> = ({ links }) => {
  return (
    <Row as="ul">
      {links.map((link) => (
        <li key={link.name}>
          <Link href={link.url}>
            <div
              className="flex rounded-50 bg-palette-white p-25"
              title={link.name}
            >
              <img
                alt={link.name}
                className="size-[16px] object-contain"
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
