import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { creationPaths } from "../../../entities/creation/paths/creation-paths";
import { formatPageTitle } from "../../../entities/page-title/formatter";
import { CreationDetail } from "../../../features/creation/creation-detail/creation-detail";
import {
  readCreationById,
  readCreationSummaries,
} from "../../../features/creation/creation-reader/read-creation";
import { RelatedCreations } from "../../../features/creation/related-creations/related-creations";
import { HeaderFooterTemplate } from "../../../features/layout/header-footer-template/header-footer-template";
import { Container } from "../../../shared/design-system/layout/container/container";
import { Col } from "../../../shared/design-system/layout/flex/flex";
import { FadeIn } from "../../../shared/design-system/ui/fade-in/fade-in";

export const generateStaticParams = async () => {
  const summaries = await readCreationSummaries();

  return summaries.map(({ id }) => ({
    id,
  }));
};

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const creation = await readCreationById(params.id);

  if (creation === null) {
    notFound();
  }

  return {
    title: formatPageTitle(creation.title),
    openGraph: {
      type: "website",
      images: "/logo.png",
      url: creationPaths.detail(creation.id),
    },
  };
};

const CreationDetailPage = ({ params }: Props) => {
  return (
    <HeaderFooterTemplate>
      <Container center paddingX="200" paddingY="400" size="100">
        <Col gap="500">
          <main>
            <FadeIn>
              <CreationDetail id={params.id} />
            </FadeIn>
          </main>
          <nav>
            <FadeIn delaySec={0.2}>
              <RelatedCreations id={params.id} />
            </FadeIn>
          </nav>
        </Col>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default CreationDetailPage;
