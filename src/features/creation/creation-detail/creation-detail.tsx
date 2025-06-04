import type { FC } from "react";
import { match } from "ts-pattern";

import { creationTypes } from "@/entities/creation/creation-type";
import type { Creation } from "@/entities/creation/models/creation";
import { resolveMDXContent } from "@/features/mdx/resolver";
import { Icon } from "@/shared/design-system/icons";
import { Col, Row } from "@/shared/design-system/layout";
import { theme } from "@/shared/design-system/theme.css";
import { H2, Link, Text } from "@/shared/design-system/ui";
import { formatDate } from "@/shared/utils/date";

import { PublicLinks } from "./public-links/public-links";
import { GameplayScreen } from "./variant-content/gameplay-screen";
import { IllustrationImage } from "./variant-content/illustration-image";
import { WebappLogo } from "./variant-content/webapp-logo";

type CreationDetailProps = {
  creation: Creation;
};

export const CreationDetail: FC<CreationDetailProps> = ({ creation }) => {
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
      <Col gap="100">
        <H2 size="500" weight="bold">
          {creation.title}
        </H2>
        <PublicLinks publicLinks={creation.publicLinks} />
        <Col gap="100">
          {MDXContent ? (
            <div>
              <MDXContent
                components={{
                  a: (props: Parameters<typeof Link>[0]) => (
                    <Link colored {...props} />
                  ),
                }}
              />
            </div>
          ) : null}
          <Col gap="50">
            <Row gap="100">
              <Row align="center" gap="25">
                <Icon
                  color={theme.color.text.secondary}
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
