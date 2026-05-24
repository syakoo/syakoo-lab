import { type ColorKey, resolveGeometryColor } from "./core";

type TextProps = {
  x: number;
  y: number;
  color?: ColorKey;
  width?: string | number;
  height?: string | number;
  children: React.ReactNode;
};

export const Text: React.FC<TextProps> = ({
  x,
  y,
  color,
  children,
  width = 100,
  height = 40,
}) => {
  return (
    <foreignObject
      height={height}
      requiredExtensions="http://www.w3.org/1999/xhtml"
      style={{
        color: color ? resolveGeometryColor(color) : "currentColor",
      }}
      width={width}
      x={x}
      y={y}
    >
      {children}
    </foreignObject>
  );
};
