export { resolveWritingHead } from "./model/head-resolver";
export { writingPaths } from "./model/paths/writing-paths";
export type {
  SerializedWriting,
  WritingHead,
  WritingTocItem,
  WritingType,
} from "./model/writing";
export {
  generateDummySerializedWriting,
  generateDummyWritingHead,
} from "./model/writing.mocks";
export { resolveWritingToc } from "./model/writing-toc/toc-resolver";
export {
  getWritingTypeConfig,
  writingTypeConfig,
  writingTypes,
} from "./model/writing-type/writing-type";
