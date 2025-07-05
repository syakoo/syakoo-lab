import { CreationCard } from "@/entities/creation/creation-card";
import type {
  CreationGame,
  CreationIllust,
  CreationWebapp,
} from "@/entities/creation/models/creation";
import { creationPaths } from "@/entities/creation/paths";
import { Col } from "@/shared/design-system/layout";
import { FadeIn, H2, Link } from "@/shared/design-system/ui";

import { creationListStyles } from "./creation-list.css";

export type CreationListPropsCreation =
  | Pick<CreationIllust, "id" | "type" | "title" | "illust">
  | Pick<CreationGame, "id" | "type" | "title" | "logo">
  | Pick<CreationWebapp, "id" | "type" | "title" | "logo">;

type CreationListViewProps = {
  creations: CreationListPropsCreation[];
};

export const CreationListView: React.FC<CreationListViewProps> = ({
  creations,
}) => {
  return (
    <section>
      <Col gap="200">
        <H2>Creations</H2>
        <ul className={creationListStyles.listContainer}>
          {creations.map((creation, i) => (
            <FadeIn key={creation.id} as="li" delaySec={0.05 * i}>
              <Link display="block" href={creationPaths.detail(creation.id)}>
                <CreationCard {...creation} />
              </Link>
            </FadeIn>
          ))}
        </ul>
      </Col>
    </section>
  );
};
