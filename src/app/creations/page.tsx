import type { FC } from "react";

import {
  generateDummyCreationGame,
  generateDummyCreationIllust,
  generateDummyCreationWebapp,
} from "@/entities/creation/models/creation.mocks";
import { CreationList } from "@/features/creation/creation-list";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template";
import { Container } from "@/shared/design-system/layout";
import { random } from "@/shared/test-utils/random/random";
import { range } from "@/shared/utils/array/range";

const CreationsPage: FC = () => {
  // TODO: データは後で実装
  const creations = range(0, random.integer(1, 10)).map(() =>
    random.pickOne([
      generateDummyCreationIllust(),
      generateDummyCreationGame(),
      generateDummyCreationWebapp(),
    ]),
  );

  return (
    <HeaderFooterTemplate>
      <Container as="main" center paddingX="200" paddingY="400" size="100">
        <CreationList creations={creations} />
      </Container>
    </HeaderFooterTemplate>
  );
};

export default CreationsPage;
