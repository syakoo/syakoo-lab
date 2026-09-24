import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, within } from "storybook/test";

import { LinkCard } from "./link-card";

const meta = {
  component: LinkCard,
  parameters: {},
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

    expect(favicon).toHaveAttribute(
      "src",
      "https://www.google.com/s2/favicons?domain=syakoo-lab.com&sz=32",
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
    title: "Example Title",
    url: "https://example.com/",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const favicon = canvasElement.querySelector("img");

    expect(favicon).toHaveAttribute(
      "src",
      "https://www.google.com/s2/favicons?domain=example.com&sz=32",
    );
    expect(canvas.getByText("Example Title")).toBeVisible();
    expect(canvas.getByText("example.com")).toBeVisible();
    expect(
      canvasElement.textContent?.replace(/\s+/g, ""),
      "description is omitted from the card",
    ).toBe("ExampleTitleexample.com");
  },
};
