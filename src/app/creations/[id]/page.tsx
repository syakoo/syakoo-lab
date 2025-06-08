import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { creationPaths } from "@/entities/creation/paths";
import { formatPageTitle } from "@/entities/page-title/formatter";
import { CreationDetail } from "@/features/creation/creation-detail";
import {
  readCreationById,
  readCreationSummaries,
} from "@/features/creation/creation-reader/read-creation";
import {
  getRelatedCreations,
  RelatedCreations,
} from "@/features/creation/related-creations";
import { HeaderFooterTemplate } from "@/features/layout/header-footer-template";
import { Col, Container } from "@/shared/design-system/layout";
import { FadeIn } from "@/shared/design-system/ui";

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

const CreationDetailPage = async ({ params }: Props) => {
  const creation = await readCreationById(params.id);
  if (creation === null) notFound();

  const relatedCreations = getRelatedCreations(
    creation,
    await readCreationSummaries(),
  );

  return (
    <HeaderFooterTemplate>
      <Container center paddingX="200" paddingY="400" size="100">
        <Col gap="500">
          <main>
            <FadeIn>
              <CreationDetail creation={creation} />
            </FadeIn>
          </main>
          <nav>
            <FadeIn delaySec={0.2}>
              <RelatedCreations relatedCreations={relatedCreations} />
            </FadeIn>
          </nav>
        </Col>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default CreationDetailPage;
