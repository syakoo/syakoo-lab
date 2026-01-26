import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { ImageLightboxRoot, ImageLightboxTrigger } from "./image-lightbox";

const meta = {
  tags: ["autodocs"],
  parameters: {},
  render: () => (
    <ImageLightboxRoot alt="サンプル画像" src="/img/arts/20210912.png">
      <ImageLightboxTrigger>
        <img
          alt="サンプル画像"
          src="/img/arts/20210912.png"
          style={{ width: 200, height: "auto", borderRadius: 8 }}
        />
      </ImageLightboxTrigger>
    </ImageLightboxRoot>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Sample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // dialog 内にも同じ alt の画像があるので、Trigger 内の画像を取得
    const images = canvas.getAllByAltText("サンプル画像");
    const triggerImage = images[0];

    // Desktop では button でラップされている
    expect(
      triggerImage.closest("button"),
      "button でラップされている",
    ).not.toBeNull();
  },
};

/**
 * Mobile 表示の確認用ストーリー
 * TODO: test-runner では viewport 変更が matchMedia に反映されるタイミングの問題で
 *       テストが不安定なため、Storybook バージョンアップ後に再対応する
 *       @see https://github.com/syakoo/syakoo-lab/issues/204
 */
export const Mobile: Story = {
  tags: ["test:skip"],
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};

export const OpenAndCloseDialog: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    const dialog = canvasElement.querySelector("dialog") as HTMLDialogElement;

    await step("初期状態: ダイアログは閉じている", async () => {
      expect(dialog.open).toBe(false);
    });

    await step("ボタンクリックでダイアログが開く", async () => {
      await userEvent.click(button);
      expect(dialog.open).toBe(true);
    });

    await step("画像クリックではダイアログは閉じない", async () => {
      const dialogImage = dialog.querySelector("img") as HTMLImageElement;
      await userEvent.click(dialogImage);
      expect(dialog.open).toBe(true);
    });

    await step("ESC キーでダイアログが閉じる", async () => {
      await userEvent.type(dialog, "{Escape}");
      await waitFor(
        () => {
          expect(dialog.open).toBe(false);
        },
        { timeout: 1000 },
      );
    });
  },
};
