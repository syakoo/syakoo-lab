import { Row, Spacer } from "@/design-system/layout";
import { H1, Link, Text } from "@/design-system/ui";

import { errorCodeStyles } from "./page-not-found.css";

export const PageNotFound: React.FC = () => {
  return (
    <section>
      <Row align="flexEnd" as="header" gap="300">
        <div className={errorCodeStyles}>404</div>
        <div>
          <H1 size="500">Not Found</H1>
          <Spacer y="50" />
        </div>
      </Row>
      <div>
        <Text as="span">
          ページが見つかりませんでした。正しいURLかもう一度お確かめください。
        </Text>
        <Link colored href="/">
          Home に戻る
        </Link>
      </div>
    </section>
  );
};
