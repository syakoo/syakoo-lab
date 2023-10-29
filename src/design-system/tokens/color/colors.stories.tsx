import { Fragment } from "react";
import type { Meta } from "@storybook/react";
import { colors } from "./colors";

const meta = {
  title: "design-system/tokens/colors",
} satisfies Meta;

export default meta;

const ColorInfo = ({ name, color }: { name: string; color: string }) => {
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
          backgroundColor: color,
          width: 82,
          height: 82,
          borderRadius: "45% 60% 45% 60% / 60% 45% 60% 45%",
        }}
      />
      <div
        style={{
          textAlign: "center",
          fontSize: 12,
          color: colors.text.secondary,
        }}
      >
        <p>{name}</p>
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
      {Object.entries(colors).map(([key1, value1]) => {
        // value が string <=> カラーコード
        if (typeof value1 === "string") {
          return <ColorInfo key={value1} color={value1} name={key1} />;
        }

        return (
          <div key={key1}>
            <h1>{key1.toUpperCase()}</h1>
            <div
              style={{
                display: "grid",
                marginTop: 12,
                gap: 12,
                width: "100%",
                gridTemplateColumns: "repeat(auto-fit, 160px)",
              }}
            >
              {Object.entries(value1).map(
                ([key2, value2]: [string, string | Record<string, string>]) => {
                  // value が string <=> カラーコード
                  if (typeof value2 === "string") {
                    return (
                      <ColorInfo
                        key={key2}
                        color={value2}
                        name={[key1, key2].join(".")}
                      />
                    );
                  }

                  return (
                    <Fragment key={key2}>
                      {Object.entries(value2).map(([key3, value3]) => {
                        // value が string <=> カラーコード
                        if (typeof value3 === "string") {
                          return (
                            <ColorInfo
                              key={key3}
                              color={value3}
                              name={[key1, key2, key3].join(".")}
                            />
                          );
                        }

                        return (
                          <div key={key3}>
                            <h3>{key3}</h3>
                            <div>用意してませんw</div>
                          </div>
                        );
                      })}
                    </Fragment>
                  );
                },
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
