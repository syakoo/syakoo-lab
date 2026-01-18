import { Icon } from "@/shared/design-system/icons/icon";
import { Row } from "@/shared/design-system/layout/flex/flex";
import { Link } from "@/shared/design-system/ui/link/link";
import { Span } from "@/shared/design-system/ui/text/text";

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
      <div className="rounded-300 border border-text-tertiary py-25 pr-100 pl-50 hover:border-text-secondary hover:bg-background-secondary">
        <Row align="center" gap="50">
          <div
            className="flex size-[22px] rounded-1000 p-50"
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
