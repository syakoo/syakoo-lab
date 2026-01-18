import { notFound } from "next/navigation";
import { match } from "ts-pattern";

import { creationTypes } from "@/entities/creation/creation-type/creation-type";
import { readCreationById } from "@/features/creation/creation-reader/read-creation";
import { resolveMDXContent } from "@/features/mdx/resolver";
import { Icon } from "@/shared/design-system/icons/icon";
import { Col, Row } from "@/shared/design-system/layout/flex/flex";
import { Link } from "@/shared/design-system/ui/link/link";
import { H2, Text } from "@/shared/design-system/ui/text/text";
import { cn } from "@/shared/utils/cn/cn";
import { formatDate } from "@/shared/utils/date";
import styles from "./creation-detail.module.css";

import { FileView } from "./file-view/file-view";
import { PublicLinks } from "./public-links/public-links";
import { GameplayScreen } from "./variant-content/gameplay-screen";
import { IllustrationImage } from "./variant-content/illustration-image";
import { WebappLogo } from "./variant-content/webapp-logo";

type CreationDetailProps = {
  id: string;
};

export const CreationDetail = async ({ id }: CreationDetailProps) => {
  const creation = await readCreationById(id);
  if (!creation) notFound();

  const MDXContent = creation.content
    ? resolveMDXContent(creation.content).data
    : null;

  return (
    <Col as="article" gap="200">
      {match(creation)
        .with({ type: "illust" }, (creation) => (
          <IllustrationImage illust={creation.illust} title={creation.title} />
        ))
        .with({ type: "game" }, (creation) => (
          <GameplayScreen
            gameplayScreen={creation.gameplayScreen}
            title={creation.title}
          />
        ))
        .with({ type: "webapp" }, (creation) => (
          <WebappLogo logo={creation.logo} title={creation.title} />
        ))
        .exhaustive()}
      <Col gap="200">
        <Col gap="100">
          <H2 size="500" weight="bold">
            {creation.title}
          </H2>
          {creation.publicLinks.length > 0 ? (
            <PublicLinks publicLinks={creation.publicLinks} />
          ) : null}
        </Col>
        <Col gap="200">
          {MDXContent ? (
            <div
              className={cn(
                styles.contentWrapper,
                creation.type === "game" && "whitespace-pre-wrap",
              )}
            >
              <MDXContent
                components={{
                  a: (props: Parameters<typeof Link>[0]) => (
                    <Link colored {...props} />
                  ),
                  FileView,
                }}
              />
            </div>
          ) : null}
          <Col gap="50">
            <Row gap="100">
              <Row align="center" gap="25">
                <Icon
                  className="text-text-secondary"
                  height={16}
                  name={creationTypes[creation.type].icon}
                  width={16}
                />
                <Text color="secondary" size="75">
                  {creationTypes[creation.type].label}
                </Text>
              </Row>
              <Row gap="50">
                {creation.tags.map((tag) => (
                  <Text key={tag} color="secondary" size="75">
                    #{tag}
                  </Text>
                ))}
              </Row>
            </Row>
            <Text color="secondary" size="75">
              {formatDate(creation.published)}
            </Text>
          </Col>
        </Col>
      </Col>
    </Col>
  );
};
