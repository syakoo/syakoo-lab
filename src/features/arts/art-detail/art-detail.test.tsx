import { setupJestMockServer } from "@/api/mocks/jest";
import { defaultHandlers } from "@/api/mocks/msw";
import { testStories } from "@/test/test-stories";

import * as stories from "./art-detail.stories";

setupJestMockServer(...defaultHandlers);

describe("ArtDetail", () => {
  testStories(stories);
});
