import { setupJestMockServer } from "@/api/mocks/jest";
import { defaultHandlers } from "@/api/mocks/msw";
import { testStories } from "@/test/test-stories";

import * as stories from "./art-gallery-item.stories";

setupJestMockServer(...defaultHandlers);

describe("ArtGalleryItem", () => {
  testStories(stories);
});
