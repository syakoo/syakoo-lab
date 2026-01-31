import type { MDXComponent } from "../types";

export const exampleMDXComponent: MDXComponent = ({ components }) => {
  const H2 = components?.h2 ?? "h2";

  return (
    <>
      <p>Sample MDX Component</p>
      <H2>Sample Title</H2>
    </>
  );
};
