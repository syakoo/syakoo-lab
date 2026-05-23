"use client";

import type { SerializedWriting } from "../../../entities";
import { Link } from "../../../shared";
import { useMermaid } from "../../../mdx";
import { useTwitter } from "../../../mdx";
import { resolveMDXContent } from "../../mdx/resolver";

import { mdxComponents } from "./mdx/mdx-components";

type WritingMdxContentProps = {
  body: SerializedWriting["body"];
  className?: string;
};

const components = {
  ...mdxComponents,
  a: (props: Parameters<typeof Link>[0]) => <Link colored {...props} />,
};

export const WritingMdxContent: React.FC<WritingMdxContentProps> = ({
  body,
  className,
}) => {
  useMermaid();
  useTwitter();
  const MDXComponent = resolveMDXContent(body).data;

  return (
    <div className={className}>
      <MDXComponent components={components} />
    </div>
  );
};
