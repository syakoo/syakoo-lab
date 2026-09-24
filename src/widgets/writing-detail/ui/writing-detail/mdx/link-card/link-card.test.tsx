import { render, screen } from "@testing-library/react";

import { LinkCard } from "./link-card";

describe("LinkCard", () => {
  describe("favicon", () => {
    it("urlのhostnameをdomainパラメータとしてGoogle S2のURLでfaviconを表示する", () => {
      const { container } = render(
        <LinkCard title="Test" url="https://example.com/path?q=1" />,
      );

      const favicon = container.querySelector("img");
      expect(favicon).toHaveAttribute(
        "src",
        "https://www.google.com/s2/favicons?domain=example.com&sz=32",
      );
    });

    it("faviconSrcが指定された場合はそのURLを使用する", () => {
      const { container } = render(
        <LinkCard
          title="Test"
          url="https://example.com/"
          faviconSrc="/img/dummy/favicon.png"
        />,
      );

      const favicon = container.querySelector("img");
      expect(favicon).toHaveAttribute("src", "/img/dummy/favicon.png");
    });

    it("faviconはaltが空でアクセシビリティ上装飾画像として扱われる", () => {
      const { container } = render(
        <LinkCard title="Test" url="https://example.com/" />,
      );

      const favicon = container.querySelector("img");
      expect(favicon).toHaveAttribute("alt", "");
    });

    it("width=16 height=16で表示される", () => {
      const { container } = render(
        <LinkCard title="Test" url="https://example.com/" />,
      );

      const favicon = container.querySelector("img");
      expect(favicon).toHaveAttribute("width", "16");
      expect(favicon).toHaveAttribute("height", "16");
    });
  });

  describe("domain表示", () => {
    it("urlのhostnameをドメインとして表示する", () => {
      render(<LinkCard title="Test" url="https://example.com/some/path" />);

      expect(screen.getByText("example.com")).toBeInTheDocument();
    });

    it("faviconとドメインが同じ行に並んで表示される", () => {
      const { container } = render(
        <LinkCard title="Test" url="https://example.com/" />,
      );

      const favicon = container.querySelector("img");
      const domainText = screen.getByText("example.com");
      expect(favicon?.parentElement).toContainElement(domainText);
    });
  });

  describe("既存の動作", () => {
    it("タイトルを表示する", () => {
      render(<LinkCard title="My Title" url="https://example.com/" />);

      expect(screen.getByText("My Title")).toBeInTheDocument();
    });

    it("descriptionが指定された場合は表示する", () => {
      render(
        <LinkCard
          title="Test"
          url="https://example.com/"
          description="Some description"
        />,
      );

      expect(screen.getByText("Some description")).toBeInTheDocument();
    });

    it("descriptionが未指定の場合は表示しない", () => {
      render(<LinkCard title="Test" url="https://example.com/" />);

      expect(screen.queryByText("Some description")).not.toBeInTheDocument();
    });
  });
});
