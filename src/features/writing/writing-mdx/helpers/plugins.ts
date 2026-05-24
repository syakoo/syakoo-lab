import type { MDXCustomTextPlugin } from "../../../../entities/mdx-content/models/types";

import { imagePlugin } from "./image-plugin";
import { markupLinkCardPlugin } from "./markup-link-card-plugin";
import { markupSectionTitlePlugin } from "./markup-section-title-plugin";

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
