import { Center, Container, Row } from "@/design-system/layout";
import { Link, Text } from "@/design-system/ui";

export const Footer: React.FC = () => {
  return (
    <Center>
      <Container
        as="footer"
        paddingBottom="200"
        paddingTop="300"
        paddingX="200"
        size="200"
      >
        <Row align="center" justify="spaceBetween">
          <Text as="span" color="secondary">
            © 2021 syakoo
          </Text>
          <nav>
            <Row gap="100">
              <Link href="/">
                <Text as="span" color="secondary">
                  Home
                </Text>
              </Link>
              <Link href="/privacy-policy">
                <Text as="span" color="secondary">
                  Privacy Policy
                </Text>
              </Link>
            </Row>
          </nav>
        </Row>
      </Container>
    </Center>
  );
};
