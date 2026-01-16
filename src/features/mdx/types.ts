/**
 * MDX の本文を評価前に変換する自作プラグインのインターフェース
 */
export type MDXCustomTextPlugin = (mdxText: string) => Promise<string>;

export type MDXComponent = React.FC<{
  // biome-ignore lint/suspicious/noExplicitAny: 任意のコンポーネントを受け取るため
  components?: Record<string, React.FC<any>>;
}>;

export type SerializedMDXContent = {
  type: "serialized";
  data: string;
};
export type ResolvedMDXContent = {
  type: "resolved";
  data: MDXComponent;
};
