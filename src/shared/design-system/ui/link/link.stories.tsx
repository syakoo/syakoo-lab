import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, within } from "storybook/test";

import { siteConfig } from "../../../config/site";
import { Link } from "./link";

const meta = {
  component: Link,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof Link>;

export const Default = () => {
  return <Link href="#">Default Link</Link>;
};

export const Variants = () => {
  return (
    <>
      <div>
        <Link colored href="#">
          Colored Link
        </Link>
      </div>
      <div>
        <Link href="#" underlined>
          Underlined Link
        </Link>
      </div>
      <div>
        <Link href="#" noHovered>
          no hovered Link
        </Link>
      </div>
      <div>
        <Link href="#" noTransparent>
          no transparent Link
        </Link>
      </div>
      <div>
        <Link display="block" href="#">
          <div
            style={{
              border: "1px solid var(--color-brand-primary)",
              borderRadius: "var(--radius-100)",
            }}
          >
            Block Link
          </div>
        </Link>
      </div>
    </>
  );
};

export const ExternalLinkBehavior: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Link href="/writings">Internal relative link</Link>
      <Link href={`${siteConfig.url}/writings`}>Same-origin absolute link</Link>
      <Link href="https://github.com/syakoo">External link</Link>
      <Link href="#section">Hash link</Link>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const internalRelativeLink = canvas.getByRole("link", {
      name: "Internal relative link",
    });
    const sameOriginLink = canvas.getByRole("link", {
      name: "Same-origin absolute link",
    });
    const externalLink = canvas.getByRole("link", { name: "External link" });
    const hashLink = canvas.getByRole("link", { name: "Hash link" });

    expect(
      internalRelativeLink,
      "relative path should stay in the same tab",
    ).not.toHaveAttribute("target");
    expect(internalRelativeLink).not.toHaveAttribute("rel");

    expect(
      sameOriginLink,
      "same-origin absolute URL should stay in the same tab",
    ).not.toHaveAttribute("target");
    expect(sameOriginLink).not.toHaveAttribute("rel");

    expect(
      externalLink,
      "external URL should open in a new tab",
    ).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(
      hashLink,
      "hash link should stay in the same tab",
    ).not.toHaveAttribute("target");
    expect(hashLink).not.toHaveAttribute("rel");
  },
};
