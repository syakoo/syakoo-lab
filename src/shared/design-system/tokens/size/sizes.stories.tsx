import type { Meta } from "@storybook/nextjs";
import { useEffect, useState } from "react";

const meta = {
  title: "shared/design-system/tokens/sizes",
} satisfies Meta;

export default meta;

// CSS 変数名と Tailwind クラス名のマッピング
const containerTokens = [
  { cssVar: "--container-container-50", tailwind: "max-w-container-50" },
  { cssVar: "--container-container-100", tailwind: "max-w-container-100" },
  { cssVar: "--container-container-200", tailwind: "max-w-container-200" },
] as const;

// Tailwind: p-*, m-*, gap-*, w-*, h-* などで使用
const spacingTokens = [
  { cssVar: "--spacing-25", tailwind: "25" },
  { cssVar: "--spacing-50", tailwind: "50" },
  { cssVar: "--spacing-100", tailwind: "100" },
  { cssVar: "--spacing-200", tailwind: "200" },
  { cssVar: "--spacing-300", tailwind: "300" },
  { cssVar: "--spacing-400", tailwind: "400" },
  { cssVar: "--spacing-500", tailwind: "500" },
] as const;

const radiusTokens = [
  { cssVar: "--radius-50", tailwind: "rounded-50" },
  { cssVar: "--radius-75", tailwind: "rounded-75" },
  { cssVar: "--radius-100", tailwind: "rounded-100" },
  { cssVar: "--radius-200", tailwind: "rounded-200" },
  { cssVar: "--radius-300", tailwind: "rounded-300" },
  { cssVar: "--radius-1000", tailwind: "rounded-1000" },
  { cssVar: "--radius-swaying", tailwind: "rounded-swaying" },
] as const;

/** CSS変数から実際の値を取得 */
const getCssVar = (name: string): string => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

type SizeToken = { cssVar: string; tailwind: string };

/** 複数のCSS変数の値を取得するフック */
const useCssVars = (tokens: readonly SizeToken[]) => {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const newValues: Record<string, string> = {};
    for (const token of tokens) {
      newValues[token.cssVar] = getCssVar(token.cssVar);
    }
    setValues(newValues);
  }, [tokens]);

  return values;
};

export const Containers = () => {
  const values = useCssVars(containerTokens);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2>Container Sizes</h2>
      {containerTokens.map((token) => {
        const value = values[token.cssVar] || "";
        return (
          <div key={token.cssVar}>
            <div>
              <code>{token.tailwind}</code> ({value || "loading..."})
            </div>
            <div>
              <div
                style={{
                  width: `var(${token.cssVar})`,
                  maxWidth: "100%",
                  height: 50,
                  backgroundColor: "var(--color-palette-gray-300)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Spacings = () => {
  const values = useCssVars(spacingTokens);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2>Spacing</h2>
      <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
        p-*, m-*, gap-*, w-*, h-* などで使用
      </p>
      {spacingTokens.map((token) => {
        const value = values[token.cssVar] || "";
        return (
          <div key={token.cssVar}>
            <div>
              <code>{token.tailwind}</code> ({value || "loading..."})
            </div>
            <div>
              <div
                style={{
                  width: `var(${token.cssVar})`,
                  height: `var(${token.cssVar})`,
                  backgroundColor: "var(--color-palette-gray-300)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Radii = () => {
  const values = useCssVars(radiusTokens);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2>Border Radius</h2>
      {radiusTokens.map((token) => {
        const value = values[token.cssVar] || "";
        return (
          <div key={token.cssVar}>
            <div>
              <code>{token.tailwind}</code> ({value || "loading..."})
            </div>
            <div>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: `var(${token.cssVar})`,
                  backgroundColor: "var(--color-palette-gray-300)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
