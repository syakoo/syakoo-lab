import { composeStories } from "@storybook/react";
import { act, render } from "@testing-library/react";

import * as stories from "./HeaderFooterTemplate.stories";

const { ...otherStories } = composeStories(stories);

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/other-path"),
}));

describe("HeaderFooterTemplate", () => {
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
