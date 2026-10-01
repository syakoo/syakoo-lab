import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { TocDrawer } from "./toc-drawer";

const sampleItems = [
  { id: "intro-0", label: "導入", depth: 2 },
  { id: "basic-concept-0", label: "基本的な概念", depth: 2 },
  { id: "dev-setup-0", label: "開発環境のセットアップ", depth: 3 },
  { id: "programming-basics-0", label: "プログラミングの基礎", depth: 2 },
] as const;

const meta = {
  component: TocDrawer,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
  args: {
    items: [...sampleItems],
  },
} satisfies Meta<typeof TocDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * モバイルサイズでトリガーボタンが表示される
 */
export const MobileTrigger: Story = {
  play: async () => {
    await waitFor(() => {
      expect(
        document.querySelector('button[aria-label="目次を開く"]'),
      ).toBeTruthy();
    });
  },
};

/**
 * トリガーをクリックしてドロワーが開く（開いた状態を VRT）
 */
export const OpenDrawer: Story = {
  play: async ({ step }) => {
    await step("初期状態: ダイアログは閉じている", async () => {
      await waitFor(() => {
        expect(
          document.querySelector('button[aria-label="目次を開く"]'),
        ).toBeTruthy();
      });
      expect(document.querySelector('[role="dialog"]')).toBeNull();
    });

    await step("目次ボタンクリックでドロワーが開く", async () => {
      const trigger = document.querySelector(
        'button[aria-label="目次を開く"]',
      ) as HTMLButtonElement;
      await userEvent.click(trigger);
      await waitFor(() => {
        const dialog = document.querySelector('[role="dialog"]');
        expect(dialog).toBeTruthy();
        const transform = getComputedStyle(dialog as HTMLElement).transform;
        expect(
          transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)",
        ).toBe(true);
      });
    });

    await step("TOC リンクが表示される", async () => {
      const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
      const tocDialog = within(dialog);
      expect(
        tocDialog.getByText("基本的な概念"),
        "TOCリンクが表示されている",
      ).toBeInTheDocument();
    });
  },
};

/**
 * ドロワーを閉じるボタンで閉じる（interaction-only; skip-vrt）
 */
export const CloseDrawer: Story = {
  tags: ["skip-vrt"],
  play: async ({ step }) => {
    await step("目次ボタンクリックでドロワーが開く", async () => {
      await waitFor(() => {
        expect(
          document.querySelector('button[aria-label="目次を開く"]'),
        ).toBeTruthy();
      });
      const trigger = document.querySelector(
        'button[aria-label="目次を開く"]',
      ) as HTMLButtonElement;
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(document.querySelector('[role="dialog"]')).toBeTruthy();
      });
    });

    await step("閉じるボタンでドロワーが閉じる", async () => {
      const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
      const closeButton = within(dialog).getByRole("button", {
        name: "閉じる",
      });
      await userEvent.click(closeButton);
      await waitFor(
        () => {
          expect(document.querySelector('[role="dialog"]')).toBeNull();
        },
        { timeout: 1000 },
      );
    });
  },
};
