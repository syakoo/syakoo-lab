import type { Meta } from "@storybook/nextjs";
import { useEffect, useState } from "react";

const meta = {
  title: "shared/design-system/tokens/fonts",
} satisfies Meta;

export default meta;

// CSS 変数名と Tailwind クラス名のマッピング
// Tailwind v4: --font-* → font-* クラス
const fontFamilyTokens = [
  { cssVar: "--font-primary", tailwind: "font-primary" },
  { cssVar: "--font-code", tailwind: "font-code" },
] as const;

// Tailwind v4: --text-* → text-* クラス
const fontSizeTokens = [
  { cssVar: "--text-50", tailwind: "text-50" },
  { cssVar: "--text-75", tailwind: "text-75" },
  { cssVar: "--text-100", tailwind: "text-100" },
  { cssVar: "--text-200", tailwind: "text-200" },
  { cssVar: "--text-300", tailwind: "text-300" },
  { cssVar: "--text-400", tailwind: "text-400" },
  { cssVar: "--text-500", tailwind: "text-500" },
  { cssVar: "--text-600", tailwind: "text-600" },
  { cssVar: "--text-700", tailwind: "text-700" },
  { cssVar: "--text-800", tailwind: "text-800" },
] as const;

/** CSS変数から実際の値を取得 */
const getCssVar = (name: string): string => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

export const FontFamilies = () => {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const newValues: Record<string, string> = {};
    for (const token of fontFamilyTokens) {
      newValues[token.cssVar] = getCssVar(token.cssVar);
    }
    setValues(newValues);
  }, []);

  const defaultTexts: Record<string, string> = {
    "--font-primary": "Aaあぁア",
    "--font-code": "const Function = () => console.log();",
  };

  return (
    <div>
      <div>
        <label htmlFor="font-families-input">プレビュー用テキスト</label>
        <input
          id="font-families-input"
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "4px",
            border: "1px solid var(--color-palette-gray-400)",
            backgroundColor: "var(--color-background-secondary)",
            color: "var(--color-text-primary)",
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
        {fontFamilyTokens.map((token) => (
          <div key={token.cssVar}>
            <h3 style={{ fontSize: "12px" }}>
              <code>{token.tailwind}</code> (
              {values[token.cssVar] || "loading..."})
            </h3>
            <div
              style={{
                fontSize: "36px",
                fontFamily: `var(${token.cssVar})`,
              }}
            >
              {inputValue || defaultTexts[token.cssVar]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FontSizes = () => {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const newValues: Record<string, string> = {};
    for (const token of fontSizeTokens) {
      newValues[token.cssVar] = getCssVar(token.cssVar);
    }
    setValues(newValues);
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="font-sizes-input">プレビュー用テキスト</label>
        <input
          id="font-sizes-input"
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "4px",
            border: "1px solid var(--color-palette-gray-400)",
            backgroundColor: "var(--color-background-secondary)",
            color: "var(--color-text-primary)",
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
        {fontSizeTokens.map((token) => {
          const value = values[token.cssVar] || "";
          return (
            <div key={token.cssVar}>
              <h3 style={{ fontSize: "12px" }}>
                <code>{token.tailwind}</code> ({value || "loading..."})
              </h3>
              <div style={{ fontSize: `var(${token.cssVar})` }}>
                {inputValue || value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
