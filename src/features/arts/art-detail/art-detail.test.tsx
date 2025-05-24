import { setupJestMockServer } from "@/api/mocks/jest";
import { defaultHandlers } from "@/api/mocks/msw";
import { testStories } from "@/shared/test-utils/test-stories";

import * as stories from "./art-detail.stories";

setupJestMockServer(...defaultHandlers);

describe("ArtDetail", () => {
  testStories(stories);
});
