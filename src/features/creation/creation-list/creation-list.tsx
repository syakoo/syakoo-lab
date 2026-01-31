import { CreationCard } from "../../../entities/creation/creation-card/creation-card";
import { creationPaths } from "../../../entities/creation/paths/creation-paths";
import { Col } from "../../../shared/design-system/layout/flex/flex";
import { FadeIn } from "../../../shared/design-system/ui/fade-in/fade-in";
import { Link } from "../../../shared/design-system/ui/link/link";
import { H2 } from "../../../shared/design-system/ui/text/text";
import { readCreationSummaries } from "../creation-reader/read-creation";

export const CreationList = async () => {
  const creationSummaries = await readCreationSummaries();

  return (
    <section>
      <Col gap="200">
        <H2>Creations</H2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-100">
          {creationSummaries.map((creation, i) => (
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
