import type { Meta } from "@storybook/react";
import { useState } from "react";

import { fontFamilies } from "./font-families";
import { fontSizes } from "./font-sizes";

const meta = {
  title: "design-system/tokens/fonts",
} satisfies Meta;

export default meta;

export const FontFamilies = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div>
        <input
          // eslint-disable-next-line react/jsx-handler-names
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "4px",
            border: "gray 1px solid",
            color: "gray",
          }}
          type="text"
          value={inputValue}
        />
      </div>

      <div
        style={{
          marginTop: "48px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h2>Font Families</h2>
        <div>
          <h3 style={{ fontSize: "12px" }}>fontFamilies.primary</h3>
          <div style={{ fontSize: "36px", fontFamily: fontFamilies.primary }}>
            {inputValue || "Aaあぁア"}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: "12px" }}>fontFamilies.code</h3>
          <div style={{ fontSize: "36px", fontFamily: fontFamilies.code }}>
            {inputValue || "const Function = () => console.log();"}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FontSizes = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div>
        <input
          // eslint-disable-next-line react/jsx-handler-names
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "4px",
            border: "gray 1px solid",
            color: "gray",
          }}
          type="text"
          value={inputValue}
        />
      </div>

      <div
        style={{
          marginTop: "48px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h2>Font Sizes</h2>
        {Object.entries(fontSizes).map(([key, value]) => {
          return (
            <div key={key}>
              <h3 style={{ fontSize: "12px" }}>
                fontSizes.{key} ({value})
              </h3>
              <div style={{ fontSize: value }}>{inputValue || value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
