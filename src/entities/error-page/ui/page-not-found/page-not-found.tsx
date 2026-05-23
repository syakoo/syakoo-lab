import { Row } from "../../../shared";
import { Spacer } from "../../../shared";
import { Link } from "../../../shared";
import { H1, Text } from "../../../shared";

export const PageNotFound: React.FC = () => {
  return (
    <section>
      <Row align="flexEnd" as="header" gap="300">
        <div className="font-['arial_black'] font-bold text-800 text-brand-primary">
          404
        </div>
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
