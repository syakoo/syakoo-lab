import { findWriting } from "./find-writing";
import { WritingDetailView } from "./writing-detail.view";

type WritingDetailProps = {
  id: string;
};

export const WritingDetail: React.FC<WritingDetailProps> = async ({ id }) => {
  const writing = await findWriting(id);

  return <WritingDetailView writing={writing} />;
};
