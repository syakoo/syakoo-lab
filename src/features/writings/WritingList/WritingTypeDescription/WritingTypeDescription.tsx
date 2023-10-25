import type { WritingListType } from "../_shared/writingListType";
import { Text } from "@/design-system/ui";

type WritingTypeDescriptionProps = {
  type: WritingListType;
};

export const WritingTypeDescription: React.FC<WritingTypeDescriptionProps> = ({
  type,
}) => {
  switch (type) {
    case "all":
      return null;
    case "article":
      return <Text>Article は気合いの入った書き物を残しています。</Text>;
    case "note":
      return (
        <Text>
          Note はその時の思いつきやメモなど、アウトプットを目的としています。
        </Text>
      );
    case "diary":
      return (
        <Text>
          Diary は著者の身の回りで起こったことや全く中身のない話を残しています。
        </Text>
      );
  }
};
