import { setupJestMockServer } from "@/api/mocks/jest";
import { defaultHandlers } from "@/api/mocks/msw";
import { testStories } from "@/shared/test-utils/test-stories";

import * as stories from "./art-gallery-item.stories";

setupJestMockServer(...defaultHandlers);

describe("ArtGalleryItem", () => {
  testStories(stories);
});
