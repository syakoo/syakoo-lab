import type { Meta } from "@storybook/react";
import { TOCView } from "./TOC";
import { TOC } from ".";

const meta = {
  component: TOC,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TOC>;

export default meta;

export const Sample = () => {
  return (
    <TOCView
      activeLabel="基本的な概念"
      items={[
        { label: "導入", href: "#" },
        { label: "基本的な概念", href: "#" },
        { label: "開発環境のセットアップ", href: "#" },
        { label: "プログラミングの基礎", href: "#" },
      ]}
    />
  );
};
