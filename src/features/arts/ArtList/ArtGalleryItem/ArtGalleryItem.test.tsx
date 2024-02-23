import { setupJestMockServer } from "@/api/mocks/jest";
import { defaultHandlers } from "@/api/mocks/msw";
import { testStories } from "@/test/testStories";

import * as stories from "./ArtGalleryItem.stories";

setupJestMockServer(...defaultHandlers);

describe("ArtGalleryItem", () => {
  testStories(stories);
});
