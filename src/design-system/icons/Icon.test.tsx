import { composeStories } from "@storybook/react";
import { act, render } from "@testing-library/react";

import * as stories from "./Icon.stories";

const { ...otherStories } = composeStories(stories);

describe("Icon", () => {
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
