import type { Meta } from "@storybook/nextjs";
import { useState } from "react";

import { colors } from "@/shared/design-system/tokens/color/colors";

import { fontFamilies } from "./font-families";
import { fontSizes } from "./font-sizes";

const meta = {
  title: "shared/design-system/tokens/fonts",
} satisfies Meta;

export default meta;

export const FontFamilies = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div>
        <label htmlFor="font-families-input">プレビュー用テキスト</label>
        <input
          id="font-families-input"
          // eslint-disable-next-line react/jsx-handler-names
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "4px",
            border: `1px solid ${colors.palette.gray[400]}`,
            backgroundColor: colors.background.secondary,
            color: colors.text.primary,
            borderRadius: "4px",
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
        <label htmlFor="font-sizes-input">プレビュー用テキスト</label>
        <input
          id="font-sizes-input"
          // eslint-disable-next-line react/jsx-handler-names
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "4px",
            border: `1px solid ${colors.palette.gray[400]}`,
            backgroundColor: colors.background.secondary,
            color: colors.text.primary,
            borderRadius: "4px",
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
