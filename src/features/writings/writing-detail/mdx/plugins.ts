import type { MDXCustomTextPlugin } from "@/features/mdx/types";

import { imagePlugin } from "./image/image-plugin";
import { markupLinkCardPlugin } from "./link-card/markup-link-card-plugin";
import { markupSectionTitlePlugin } from "./section-title/markup-section-title-plugin";

/**
 * プラグイン一覧
 *
 * NOTE: node のみで使用可能なため、コンポーネントとは別ファイルでまとめる必要があった
 */
export const mdxPlugins: MDXCustomTextPlugin[] = [
  markupLinkCardPlugin,
  markupSectionTitlePlugin,
  imagePlugin,
];
