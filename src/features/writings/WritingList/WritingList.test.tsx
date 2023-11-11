import { composeStories } from "@storybook/react";
import { act, render } from "@testing-library/react";

import * as stories from "./WritingList.stories";

const { ...otherStories } = composeStories(stories);

// TODO: 他にいい方法はないものか...理想としては storybook では追加設定不要なので jest も不要になって欲しい
// story で仮に返却値を指定したとしても適切にスナップショットを撮ることができない。
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe("WritingList", () => {
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
