export type SerializedMDX = string;

export type MDXComponent = React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, React.FC<any>>;
}>;
