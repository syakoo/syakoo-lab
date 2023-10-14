import type { WritingMeta } from "../../types";

type WritingHeaderProps = {
  meta: WritingMeta;
};

export const WritingHeader: React.FC<WritingHeaderProps> = ({ meta }) => {
  return <header>{meta.title}</header>;
};
