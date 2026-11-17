/**
 * MDX の本文を評価前に変換する自作プラグインのインターフェース
 */
export type MDXCustomTextPlugin = (mdxText: string) => Promise<string>;
