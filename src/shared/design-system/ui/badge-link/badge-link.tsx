import { Icon } from "@/shared/design-system/icons";
import { Row } from "@/shared/design-system/layout";
import { theme } from "@/shared/design-system/theme.css";
import { Link, Span } from "@/shared/design-system/ui";

import { styles } from "./badge-link.css";

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
      <div className={styles.container}>
        <Row align="center" gap="50">
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: color }}
          >
            <Icon color={theme.color.text.primary} name="link" />
          </div>
          <Span color="primary" size="100">
            {children}
          </Span>
        </Row>
      </div>
    </Link>
  );
};
