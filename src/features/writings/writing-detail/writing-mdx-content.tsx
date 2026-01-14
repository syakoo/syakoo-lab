"use client";

import type { SerializedWriting } from "@/entities/writing/models/writing";
import { useMermaid } from "@/features/mdx/plugins/mermaid/use-mermaid";
import { useTwitter } from "@/features/mdx/plugins/twitter/use-twitter";
import { resolveMDXContent } from "@/features/mdx/resolver";
import { Link } from "@/shared/design-system/ui/link/link";

import { mdxComponents } from "./mdx/mdx-components";

type WritingMdxContentProps = {
  body: SerializedWriting["body"];
};

const components = {
  ...mdxComponents,
  a: (props: Parameters<typeof Link>[0]) => <Link colored {...props} />,
};

export const WritingMdxContent: React.FC<WritingMdxContentProps> = ({
  body,
}) => {
  useMermaid();
  useTwitter();
  const MDXComponent = resolveMDXContent(body).data;

  return <MDXComponent components={components} />;
};
