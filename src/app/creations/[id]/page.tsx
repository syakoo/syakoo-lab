import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { creationPaths } from "../../../entities/creation";
import { formatPageTitle } from "../../../entities/page-title";
import { Container } from "../../../shared/design-system/layout/container/container";
import { Col } from "../../../shared/design-system/layout/flex/flex";
import { FadeIn } from "../../../shared/design-system/ui/fade-in/fade-in";
import {
  CreationDetail,
  RelatedCreations,
  readCreationById,
  readCreationSummaries,
} from "../../../widgets/creation";
import { HeaderFooterTemplate } from "../../../widgets/layout";

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
      images: "/logo.png",
      url: creationPaths.detail(creation.id),
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
            <FadeIn>
              <CreationDetail id={id} />
            </FadeIn>
          </main>
          <nav>
            <FadeIn delaySec={0.2}>
              <RelatedCreations id={id} />
            </FadeIn>
          </nav>
        </Col>
      </Container>
    </HeaderFooterTemplate>
  );
};

export default CreationDetailPage;
