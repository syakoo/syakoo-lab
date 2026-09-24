import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, within } from "storybook/test";

import { LinkCard } from "./link-card";

const assertFaviconBesideDomain = (
  canvasElement: HTMLElement,
  domain: string,
) => {
  const canvas = within(canvasElement);
  // Decorative (alt="") → role "presentation", not "img".
  const favicon = canvas.getByRole("presentation");

  expect(favicon).toHaveAttribute(
    "src",
    `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
  );
  expect(favicon, "favicon is decorative").toHaveAttribute("alt", "");
  expect(favicon).toHaveAttribute("width", "16");
  expect(favicon).toHaveAttribute("height", "16");

  const domainEl = canvas.getByText(domain);
  expect(
    favicon.parentElement?.contains(domainEl) ?? false,
    "favicon sits next to the domain",
  ).toBe(true);
};

const meta = {
  component: LinkCard,
  parameters: {},
  play: async ({ canvasElement, args }) => {
    const domain = new URL(args.url).hostname;
    assertFaviconBesideDomain(canvasElement, domain);
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
  play: async (context) => {
    await meta.play?.(context);
    const canvas = within(context.canvasElement);
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
    title: "Example Title",
    url: "https://example.com/",
  },
  play: async (context) => {
    await meta.play?.(context);
    const canvas = within(context.canvasElement);
    expect(canvas.getByText("Example Title")).toBeVisible();
    expect(canvas.getByText("example.com")).toBeVisible();
    expect(
      context.canvasElement.querySelector(".line-clamp-1"),
      "description line is omitted when description is unset",
    ).toBeNull();
  },
};
