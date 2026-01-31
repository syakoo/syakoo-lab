import type { FC } from "react";

import type { CreationBase } from "../../../../entities/creation/models/creation";
import { Row } from "../../../../shared/design-system/layout/flex/flex";
import { BadgeLink } from "../../../../shared/design-system/ui/badge-link/badge-link";

type PublicLinksProps = Pick<CreationBase, "publicLinks">;

export const PublicLinks: FC<PublicLinksProps> = ({ publicLinks }) => {
  return (
    <div className="overflow-x-auto">
      <div style={{ width: "max-content" }}>
        <Row as="ul" gap="50" wrap={false}>
          {publicLinks.map((link) => (
            <li key={link.href}>
              <BadgeLink color={link.color} href={link.href}>
                {link.title}
              </BadgeLink>
            </li>
          ))}
        </Row>
      </div>
    </div>
  );
};
