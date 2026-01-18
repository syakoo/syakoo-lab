import { Row } from "@/shared/design-system/layout/flex/flex";
import { Link } from "@/shared/design-system/ui/link/link";
import { Text } from "@/shared/design-system/ui/text/text";

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
    <div className="my-100">
      <Row gap="200" wrap={false}>
        <div className="shrink-0 shadow-[0_0_5px_0px_var(--color-text-secondary)]">
          <img alt={title} src={imgSrc} width={100} />
        </div>
        <div className="break-words">
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
