/**
 * MDX の本文を評価前に変換する自作プラグインのインターフェース
 */
export type MDXCustomTextPlugin = (mdxText: string) => Promise<string>;

export type MDXComponent = React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
