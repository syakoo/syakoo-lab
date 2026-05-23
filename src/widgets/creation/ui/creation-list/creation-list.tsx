import { CreationCard } from "../../../../entities/creation";
import { creationPaths } from "../../../../entities/creation";
import { Col } from "../../../shared";
import { FadeIn } from "../../../shared";
import { Link } from "../../../shared";
import { H2 } from "../../../shared";
import { readCreationSummaries } from "../../models/creation-reader/read-creation";

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
