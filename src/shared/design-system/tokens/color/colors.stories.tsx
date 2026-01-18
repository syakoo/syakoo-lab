import type { Meta } from "@storybook/nextjs";
import { useEffect, useState } from "react";

const meta = {
  title: "shared/design-system/tokens/colors",
} satisfies Meta;

export default meta;

// CSS 変数名と Tailwind クラス名のマッピング
// Tailwind: bg-{name}, text-{name}, border-{name} などで使用
const colorTokens = {
  brand: [
    { cssVar: "--color-brand-primary", tailwind: "brand-primary" },
    { cssVar: "--color-brand-secondary", tailwind: "brand-secondary" },
  ],
  text: [
    { cssVar: "--color-text-primary", tailwind: "text-primary" },
    { cssVar: "--color-text-secondary", tailwind: "text-secondary" },
    { cssVar: "--color-text-tertiary", tailwind: "text-tertiary" },
  ],
  background: [
    { cssVar: "--color-background-primary", tailwind: "background-primary" },
    {
      cssVar: "--color-background-secondary",
      tailwind: "background-secondary",
    },
  ],
  accent: [
    {
      cssVar: "--color-accent-info-foreground",
      tailwind: "accent-info-foreground",
    },
    {
      cssVar: "--color-accent-info-background",
      tailwind: "accent-info-background",
    },
    {
      cssVar: "--color-accent-success-foreground",
      tailwind: "accent-success-foreground",
    },
    {
      cssVar: "--color-accent-success-background",
      tailwind: "accent-success-background",
    },
    {
      cssVar: "--color-accent-warn-foreground",
      tailwind: "accent-warn-foreground",
    },
    {
      cssVar: "--color-accent-warn-background",
      tailwind: "accent-warn-background",
    },
    {
      cssVar: "--color-accent-error-foreground",
      tailwind: "accent-error-foreground",
    },
    {
      cssVar: "--color-accent-error-background",
      tailwind: "accent-error-background",
    },
  ],
  code: [
    { cssVar: "--color-code-text", tailwind: "code-text" },
    { cssVar: "--color-code-background", tailwind: "code-background" },
  ],
  palette: [
    { cssVar: "--color-palette-black", tailwind: "palette-black" },
    { cssVar: "--color-palette-white", tailwind: "palette-white" },
    { cssVar: "--color-palette-gray-100", tailwind: "palette-gray-100" },
    { cssVar: "--color-palette-gray-200", tailwind: "palette-gray-200" },
    { cssVar: "--color-palette-gray-300", tailwind: "palette-gray-300" },
    { cssVar: "--color-palette-gray-400", tailwind: "palette-gray-400" },
    { cssVar: "--color-palette-gray-500", tailwind: "palette-gray-500" },
    { cssVar: "--color-palette-gray-600", tailwind: "palette-gray-600" },
    { cssVar: "--color-palette-gray-700", tailwind: "palette-gray-700" },
    { cssVar: "--color-palette-gray-800", tailwind: "palette-gray-800" },
    { cssVar: "--color-palette-gray-900", tailwind: "palette-gray-900" },
  ],
} as const;

/** CSS変数から実際の値を取得 */
const getCssVar = (name: string): string => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

type ColorToken = { cssVar: string; tailwind: string };

const ColorInfo = ({ token }: { token: ColorToken }) => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    setColor(getCssVar(token.cssVar));
  }, [token.cssVar]);

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: `var(${token.cssVar})`,
          width: 82,
          height: 82,
          borderRadius: "45% 60% 45% 60% / 60% 45% 60% 45%",
        }}
      />
      <div
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "var(--color-text-secondary)",
        }}
      >
        <p>
          <code>{token.tailwind}</code>
        </p>
        <p>{color}</p>
      </div>
    </div>
  );
};

export const Palette = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 48,
        alignContent: "stretch",
      }}
    >
      {Object.entries(colorTokens).map(([category, tokens]) => (
        <div key={category}>
          <h1>{category.toUpperCase()}</h1>
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
            bg-*, text-*, border-* などで使用
          </p>
          <div
            style={{
              display: "grid",
              marginTop: 12,
              gap: 12,
              width: "100%",
              gridTemplateColumns: "repeat(auto-fit, 160px)",
            }}
          >
            {tokens.map((token) => (
              <ColorInfo key={token.cssVar} token={token} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
