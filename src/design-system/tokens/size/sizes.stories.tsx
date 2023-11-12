import type { Meta } from "@storybook/react";
import { Fragment } from "react";

import { radii } from "./radii";
import { sizes } from "./sizes";
import { spaces } from "./spaces";

const meta = {
  title: "design-system/tokens/sizes",
} satisfies Meta;

export default meta;

export const Sizes = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spaces[200] }}>
      {Object.entries(sizes).map(([key, value]) => {
        return (
          <Fragment key={key}>
            <div>
              {key} ({value})
            </div>
            <div>
              <div
                style={{ width: value, height: 50, backgroundColor: "gray" }}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export const Spaces = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spaces[200] }}>
      {Object.entries(spaces).map(([key, value]) => {
        return (
          <Fragment key={key}>
            <div>
              {key} ({value})
            </div>
            <div>
              <div
                style={{ width: value, height: value, backgroundColor: "gray" }}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export const Radii = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spaces[200] }}>
      {Object.entries(radii).map(([key, value]) => {
        return (
          <Fragment key={key}>
            <div>
              {key} ({value})
            </div>
            <div>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: value,
                  backgroundColor: "gray",
                }}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
