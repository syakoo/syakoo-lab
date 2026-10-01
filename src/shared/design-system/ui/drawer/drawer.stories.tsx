import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Text } from "../text/text";
import { Drawer } from "./drawer";

const meta = {
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
  args: {
    open: false,
    onClose: () => {},
    title: "Drawer",
    children: <Text size="75">Drawer content</Text>,
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Drawer open (static chrome for VRT)
 */
export const Open: Story = {
  args: {
    open: true,
  },
  play: async () => {
    await waitFor(() => {
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toBeTruthy();
      const transform = getComputedStyle(dialog as HTMLElement).transform;
      expect(
        transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)",
      ).toBe(true);
    });
  },
};

/**
 * Open and close via the close button (interaction-only; skip-vrt)
 */
export const OpenAndClose: Story = {
  tags: ["skip-vrt"],
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)} type="button">
          Open drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Drawer">
          <Text size="75">Drawer content</Text>
        </Drawer>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Open drawer", async () => {
      await userEvent.click(
        canvas.getByRole("button", { name: "Open drawer" }),
      );
      await waitFor(() => {
        expect(document.querySelector('[role="dialog"]')).toBeTruthy();
      });
    });

    await step("Close via button", async () => {
      const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
      const dialogScope = within(dialog);
      await userEvent.click(
        dialogScope.getByRole("button", { name: "閉じる" }),
      );
      await waitFor(
        () => {
          expect(document.querySelector('[role="dialog"]')).toBeNull();
        },
        { timeout: 1000 },
      );
    });
  },
};
