import { type ComponentProps, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Link } from "./link";

const render = (href: string) =>
  renderToStaticMarkup(
    createElement(Link, { href } as ComponentProps<typeof Link>, "text"),
  );

describe("Link", () => {
  it("renders an external URL as a plain anchor opened in a new tab", () => {
    const html = render("https://syakoo.booth.pm/items/8911391");

    expect(html).toContain('href="https://syakoo.booth.pm/items/8911391"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("renders a hash link without target", () => {
    const html = render("#heading");

    expect(html).toContain('href="#heading"');
    expect(html).not.toContain("target=");
  });
});
