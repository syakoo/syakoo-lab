import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { creationPaths } from "../../../entities/creation";
import {
  readCreationById,
  readCreationSummaries,
} from "../../../entities/creation/index.server";
import { formatPageTitle } from "../../../entities/page-title";
import { creationOgImagePath } from "../../../features/creation/og-image";
import { Container } from "../../../shared/design-system/layout/container/container";
import { Col } from "../../../shared/design-system/layout/flex/flex";
import { CreationDetail } from "../../../widgets/creation-detail";
import { HeaderFooterTemplate } from "../../../widgets/header-footer-template";
import { RelatedCreations } from "../../../widgets/related-creations";

export const generateStaticParams = async () => {
  const summaries = await readCreationSummaries();

  return summaries.map(({ id }) => ({
    id,
  }));
};

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const creation = await readCreationById(id);

  if (creation === null) {
    notFound();
  }

  return {
    title: formatPageTitle(creation.title),
    openGraph: {
      type: "website",
      images: creationOgImagePath(creation.id),
      url: creationPaths.detail(creation.id),
    },
    twitter: {
      card: "summary",
      images: creationOgImagePath(creation.id),
    },
  };
};

const CreationDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <HeaderFooterTemplate>
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
