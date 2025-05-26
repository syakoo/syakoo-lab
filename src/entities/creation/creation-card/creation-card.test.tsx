import { render } from "@testing-library/react";

import { CreationCard } from "./creation-card";

describe("CreationCard", () => {
  it("should render correctly", () => {
    const { container } = render(
      <CreationCard
        thumbnailSrc="/test.png"
        title="Test Creation"
        type="illust"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
