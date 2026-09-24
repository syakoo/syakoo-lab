import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, within } from "storybook/test";

import { dummyImages } from "../../../../../../shared/test-utils/dummy-asset/dummy-asset";

import { LinkCard } from "./link-card";

const DUMMY_FAVICON = dummyImages["50x50"].src;

const meta = {
  component: LinkCard,
  parameters: {},
  args: {
    faviconSrc: DUMMY_FAVICON,
  },
} satisfies Meta<typeof LinkCard>;

export default meta;

type Story = StoryObj<typeof LinkCard>;

export const Sample: Story = {
  args: {
    title: "Sample Title",
    url: "https://syakoo-lab.com/",
    description: "sample description",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const favicon = canvasElement.querySelector("img");

    expect(favicon, "stories use a local dummy favicon").toHaveAttribute(
      "src",
      DUMMY_FAVICON,
    );
    expect(favicon, "favicon is decorative").toHaveAttribute("alt", "");
    expect(favicon).toHaveAttribute("width", "16");
    expect(favicon).toHaveAttribute("height", "16");

    const domain = canvas.getByText("syakoo-lab.com");
    expect(
      favicon?.parentElement?.contains(domain) ?? false,
      "favicon sits next to the domain",
    ).toBe(true);

    expect(canvas.getByText("Sample Title")).toBeVisible();
    expect(canvas.getByText("sample description")).toBeVisible();
  },
};

export const LongText: Story = {
  args: {
    title: "Sample Title Sample Title Sample Title Sample Title Sample Title",
    url: "https://syakoo-lab.com/",
    description:
      "sample description sample description sample description sample description",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "霧島国際ホテル",
    url: "https://www.kirishima-kokusai.com/",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const favicon = canvasElement.querySelector("img");

    expect(canvas.getByText("霧島国際ホテル")).toBeVisible();
    expect(canvas.getByText("www.kirishima-kokusai.com")).toBeVisible();
    expect(favicon).toHaveAttribute("src", DUMMY_FAVICON);
    expect(
      canvasElement.textContent?.replace(/\s+/g, ""),
      "description is omitted from the card",
    ).toBe("霧島国際ホテルwww.kirishima-kokusai.com");
  },
};

/** Asserts the production Google S2 URL; skip-vrt so the external src is not snapshotted. */
export const DefaultFaviconSrc: Story = {
  tags: ["skip-vrt"],
  render: () => <LinkCard title="Test" url="https://example.com/path?q=1" />,
  play: async ({ canvasElement }) => {
    const favicon = canvasElement.querySelector("img");
    expect(favicon).toHaveAttribute(
      "src",
      "https://www.google.com/s2/favicons?domain=example.com&sz=32",
    );
  },
};
