import Image from "next/image";

import { Row } from "@/shared/design-system/layout";
import { Link, Span } from "@/shared/design-system/ui";

import { styles } from "./badge-link.css";

export type BadgeLinkProps = {
  href: string;
  imageUrl: string;
  children: string;
};

export const BadgeLink: React.FC<BadgeLinkProps> = ({
  href,
  imageUrl,
  children,
}) => {
  return (
    <Link href={href} noTransparent>
      <div className={styles.container}>
        <Row align="center" gap="50">
          <Image
            alt=""
            className={styles.image}
            height={24}
            src={imageUrl}
            width={24}
          />
          <Span color="primary" size="100">
            {children}
          </Span>
        </Row>
      </div>
    </Link>
  );
};
