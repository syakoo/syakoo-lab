export type { MDXCustomTextPlugin } from "../../models/types";

export type MDXComponent = React.FC<{
  // biome-ignore lint/suspicious/noExplicitAny: 任意のコンポーネントを受け取るため
  components?: Record<string, React.FC<any>>;
}>;

export type ResolvedMDXContent = {
  type: "resolved";
  data: MDXComponent;
};
