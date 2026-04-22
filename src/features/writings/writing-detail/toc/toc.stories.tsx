import type { Meta } from "@storybook/nextjs";
import { Toc, TocView } from "./toc";

const meta = {
  component: Toc,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Toc>;

export default meta;

export const Sample = () => {
  return (
    <TocView
      activeId="basic-concept-0"
      items={[
        { id: "intro-0", label: "導入", depth: 2 },
        {
          id: "basic-concept-0",
          label: "基本的な概念",
          depth: 2,
        },
        {
          id: "dev-setup-0",
          label: "開発環境のセットアップ",
          depth: 3,
        },
        {
          id: "programming-basics-0",
          label: "プログラミングの基礎",
          depth: 2,
        },
      ]}
    />
  );
};
