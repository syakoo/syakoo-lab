import { composeStories } from "@storybook/react";
import { act, render } from "@testing-library/react";

import { setupJestMockServer } from "@/api/mocks/jest";
import { defaultHandlers } from "@/api/mocks/msw";

import * as stories from "./ArtGalleryItem.stories";

const { ...otherStories } = composeStories(stories);

setupJestMockServer(...defaultHandlers);

describe("ArtGalleryItem", () => {
  const testCases = Object.values(otherStories).map(
    (Story) => [Story.storyName, Story] as const,
  );
  test.each(testCases)("renders %s", async (_, Story) => {
    const tree = render(<Story />);
    await act(async () => {
      if (Story.play) {
        await Story.play({ canvasElement: tree.container });
      }
    });

    expect(tree.baseElement).toMatchSnapshot();
  });
});