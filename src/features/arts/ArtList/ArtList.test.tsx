import { setupJestMockServer } from "@/api/mocks/jest";
import { defaultHandlers } from "@/api/mocks/msw";
import { testStories } from "@/test/testStories";

import * as stories from "./ArtList.stories";

setupJestMockServer(...defaultHandlers);

describe("ArtList", () => {
  testStories(stories);
});
