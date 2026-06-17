import type { FC } from "react";

type MockMDXComponent = FC<{
  components?: Record<string, FC<unknown>>;
}>;

export const exampleMDXComponent: MockMDXComponent = ({ components }) => {
  const H2 = components?.h2 ?? "h2";

  return (
    <>
      <p>Sample MDX Component</p>
      <H2>Sample Title</H2>
    </>
  );
};
