import { Icon } from "../../icons/icon";
import { Row } from "../../layout/flex/flex";
import { Link } from "../link/link";
import { Span } from "../text/text";

export type BadgeLinkProps = {
  href: string;
  color: string;
  children: string;
};

export const BadgeLink: React.FC<BadgeLinkProps> = ({
  href,
  color,
  children,
}) => {
  return (
    <Link href={href} noHovered noTransparent>
      <div className="rounded-300 border-palette-gray-700 hover:border-palette-gray-400 hover:bg-background-secondary border py-25 pr-100 pl-50">
        <Row align="center" gap="50">
          <div
            className="rounded-1000 flex size-[22px] p-50"
            style={{ backgroundColor: color }}
          >
            <Icon className="text-text-primary" name="link" />
          </div>
          <Span color="primary" size="75">
            {children}
          </Span>
        </Row>
      </div>
    </Link>
  );
};
