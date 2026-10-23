import { creationPaths } from "../../entities/creation";
import {
  readCreationById,
  readCreationSummaries,
} from "../../entities/creation/index.server";
import { formatPageTitle } from "../../entities/page-title";
import { creationOgImagePath } from "../../features/creation/og-image";
import { Container } from "../../shared/design-system/layout/container/container";
import { Col } from "../../shared/design-system/layout/flex/flex";
import { PageMeta } from "../../shared/page-meta/page-meta";
import { notFound } from "../../shared/router/not-found";
import { CreationDetail } from "../../widgets/creation-detail";
import { HeaderFooterTemplate } from "../../widgets/header-footer-template";
import { RelatedCreations } from "../../widgets/related-creations";

export const getConfig = async () => {
  const summaries = await readCreationSummaries();

  return {
    render: "static",
    staticPaths: summaries.map(({ id }) => id),
  } as const;
};

type Props = {
  id: string;
};

const CreationDetailPage = async ({ id }: Props) => {
  const creation = await readCreationById(id);

  if (creation === null) {
    notFound();
  }

  return (
    <HeaderFooterTemplate>
      <PageMeta
        image={creationOgImagePath(creation.id)}
        path={creationPaths.detail(creation.id)}
        title={formatPageTitle(creation.title)}
      />
      <Container center paddingX="200" paddingY="400" size="100">
        <Col gap="500">
          <main>
            <CreationDetail id={id} />
          </main>
          <nav>
            <RelatedCreations id={id} />
          </nav>
        </Col>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default CreationDetailPage;
