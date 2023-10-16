import { useMemo } from "react";
import { useGeometry, type PointData, points2Coordinates } from "./core";
import { type ColorKey, resolveGeometryColor } from "./core";

type CircleProps = {
  x?: number;
  y?: number;
  r?: number;
  points?: PointData[];
  color?: ColorKey;
  width?: number;
} & Omit<React.SVGProps<SVGCircleElement>, "points">;

export const Circle: React.FC<CircleProps> = ({
  x,
  y,
  r,
  points,
  color,
  width,
  ...circleProps
}) => {
  const storedPoints = useGeometry().points;

  const circleInfo = useMemo(() => {
    if (x && y && r) return { x, y, r };
    if (!points) return null;
    const ps = points2Coordinates(points, storedPoints);

    if (!ps) return null;

    const [[x1, y1], [x2, y2], [x3, y3]] = ps;
    const cx =
      ((y1 - y2) * (x3 ** 2 - x1 ** 2 + y3 ** 2 - y1 ** 2) -
        (y1 - y3) * (x2 ** 2 - x1 ** 2 + y2 ** 2 - y1 ** 2)) /
      (2 * (x1 - x2) * (y1 - y3) - 2 * (x1 - x3) * (y1 - y2));
    const cy =
      (-(x1 - x2) * (x3 ** 2 - x1 ** 2 + y3 ** 2 - y1 ** 2) +
        (x1 - x3) * (x2 ** 2 - x1 ** 2 + y2 ** 2 - y1 ** 2)) /
      (2 * (x1 - x2) * (y1 - y3) - 2 * (x1 - x3) * (y1 - y2));
    const cr = Math.sqrt((cx - x1) ** 2 + (cy - y1) ** 2);

    return { x: cx, y: cy, r: cr };
  }, [x, y, r, points, storedPoints]);

  if (!circleInfo) return null;

  return (
    <circle
      cx={circleInfo.x}
      cy={circleInfo.y}
      fill="transparent"
      r={circleInfo.r}
      stroke={color ? resolveGeometryColor(color) : "currentColor"}
      strokeWidth={width || 2}
      {...circleProps}
    />
  );
};
