import type {
  Parameters as StoryParameters,
  composeStory,
} from "@storybook/react";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import { mockNextNavigation } from "./nextjs/navigation";
import preview from "../../.storybook/preview";

type ComposedStories = Record<string, ReturnType<typeof composeStory>>;

const testLevelLabel = {
  none: "チェックなし",
  check: "描画チェック",
  snapshot: "スナップショット",
} satisfies Record<Required<StoryParameters>["testLevel"], string>;

export const testStories = (stories: Parameters<typeof composeStories>[0]) => {
  const composedStories: ComposedStories = composeStories(stories, preview);
  const testCases = Object.values(composedStories)
    .filter((Story) => Story.parameters.testLevel !== "none")
    .map(
      (Story) =>
        [
          `${testLevelLabel[Story.parameters.testLevel ?? "check"]} ${Story.storyName}`,
          Story,
        ] as const,
    );

  test.each(testCases)("%s", async (_, Story) => {
    // NOTE: next/navigation のモック化と Story からの情報注入
    const { useSearchParams } = mockNextNavigation();
    useSearchParams.mockImplementation(() => {
      const params = new URLSearchParams();

      Object.entries(Story.parameters.nextjs?.navigation?.query ?? {}).map(
        ([key, value]) => {
          params.set(key, value);
        },
      );
      return params;
    });

    const tree = render(<Story />);
    if (Story.play) {
      await Story.play({ canvasElement: tree.container });
    }

    if (Story.parameters.testLevel === "snapshot") {
      expect(tree.baseElement).toMatchSnapshot();
    }
  });
};
