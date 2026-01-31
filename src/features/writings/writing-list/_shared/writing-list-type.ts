import { useSearchParams } from "next/navigation";

import type { WritingType } from "../../../../entities/writing/models/writing";
import { writingPaths } from "../../../../entities/writing/paths/writing-paths";
import { writingTypes } from "../../../../entities/writing/writing-type/writing-type";

export type WritingListType = WritingType | "all";

const writingListTypeQueryKey = "type";

export const writingListTypePath = (type: WritingListType) =>
  type === "all"
    ? writingPaths.list()
    : (`${writingPaths.list()}?${writingListTypeQueryKey}=${type}` as const);

export const useGetWritingListType = (): WritingListType => {
  const searchParams = useSearchParams();
  const type = (() => {
    const queryParamType = searchParams.get(writingListTypeQueryKey);

    const isNotWritingType = !(writingTypes as string[]).includes(
      queryParamType ?? "",
    );
    if (isNotWritingType) {
      return "all";
    }

    return queryParamType as WritingType;
  })();

  return type;
};
