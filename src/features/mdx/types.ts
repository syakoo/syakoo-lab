/**
 * MDX の本文を評価前に変換する自作プラグインのインターフェース
 */
export type MDXCustomTextPlugin = (mdxText: string) => Promise<string>;

export type SerializedMDX = string;

export type MDXComponent = React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, React.FC<any>>;
}>;
