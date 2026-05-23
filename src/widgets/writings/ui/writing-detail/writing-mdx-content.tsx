"use client";

import type { SerializedWriting } from "../../../../entities/writing";
import { Link } from "../../../../shared/design-system/ui/link/link";
import { resolveMDXContent, useMermaid, useTwitter } from "../../../mdx";

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
