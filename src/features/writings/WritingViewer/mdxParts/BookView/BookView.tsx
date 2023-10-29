import { bookViewStyles } from "./BookView.css";
import { Row } from "@/design-system/layout";
import { Link, Text } from "@/design-system/ui";

type BookViewProps = {
  title: string;
  imgSrc: string;
  published?: string;
  author?: string;
  amazonLink?: string;
};

export const BookView: React.FC<BookViewProps> = ({
  title,
  imgSrc,
  amazonLink,
  published,
  author,
}) => {
  return (
    <div className={bookViewStyles.root}>
      <Row gap="200" wrap={false}>
        <div className={bookViewStyles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={title} src={imgSrc} width={100} />
        </div>
        <div className={bookViewStyles.description}>
          <div>
            <Text size="300" weight="bold">
              {title}
            </Text>
          </div>
          <div>
            <Row gap="50">
              <Text as="span" color="secondary" size="50">
                {author}
              </Text>
              <Text as="span" color="secondary" size="50">
                {published}
              </Text>
            </Row>
            {amazonLink ? (
              <Link colored href={amazonLink} underlined>
                <Text as="span" size="50">
                  Amazon
                </Text>
              </Link>
            ) : null}
          </div>
        </div>
      </Row>
    </div>
  );
};
