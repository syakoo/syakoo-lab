import { useEffect } from "react";
import { type PointId, useGeometry } from "./core";
import { type ColorKey, resolveGeometryColor } from "./core";

type PointProps = {
  id?: PointId;
  x: number;
  y: number;
  color?: ColorKey;
} & React.SVGProps<SVGCircleElement>;

export const Point: React.FC<PointProps> = ({
  id,
  x,
  y,
  color,
  ...circleProps
}) => {
  const { setPoint } = useGeometry();

  useEffect(() => {
    if (id) setPoint(id, [x, y]);
    // 最初のレンダーのみで ok
  }, []);

  return (
    <circle
      fill={color ? resolveGeometryColor(color) : "currentColor"}
      r={8}
      {...circleProps}
      cx={x}
      cy={y}
    />
  );
};
