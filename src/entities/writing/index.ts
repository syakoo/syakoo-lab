export { writingPaths } from "./helpers/paths/writing-paths";
export type {
  SerializedWriting,
  WritingHead,
  WritingTocItem,
  WritingType,
} from "./models/writing";
export {
  generateDummySerializedWriting,
  generateDummyWritingHead,
} from "./models/writing.mocks";
export { resolveWritingHead } from "./models/writing-reader/head-resolver";
export {
  getWritingTypeConfig,
  writingTypeConfig,
  writingTypes,
} from "./models/writing-type/writing-type";
