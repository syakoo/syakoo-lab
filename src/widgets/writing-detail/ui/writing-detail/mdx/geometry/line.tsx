import { useMemo } from "react";
import {
  type ColorKey,
  type Coordinates,
  type PointData,
  points2Coordinates,
  resolveGeometryColor,
  useGeometry,
} from "./core";

type LineProps = {
  points: PointData[];
  extend?: number | [number, number];
  color?: ColorKey;
} & Omit<React.SVGProps<SVGLineElement>, "points">;

export const Line: React.FC<LineProps> = ({
  points,
  color,
  extend = 0,
  ...lineProps
}) => {
  const storedPoints = useGeometry().points;

  const line = useMemo(() => {
    const ps = points2Coordinates(
      [points[0], points[points.length - 1]],
      storedPoints,
    );

    if (!ps) return null;
    if (extend === 0) return ps;

    // 傾きを求める
    const dx = ps[1][0] - ps[0][0];
    const dy = ps[1][1] - ps[0][1];
    const rad = Math.atan2(dy, dx);
    let es = [0, 0];
    if (typeof extend === "number") {
      es = [extend, extend];
    } else {
      es = extend;
    }

    const start: Coordinates = [
      ps[0][0] - es[0] * Math.cos(rad),
      ps[0][1] - es[0] * Math.sin(rad),
    ];
    const end: Coordinates = [
      ps[1][0] + es[1] * Math.cos(rad),
      ps[1][1] + es[1] * Math.sin(rad),
    ];

    return [start, end];
  }, [storedPoints, points, extend]);

  if (!line) return null;

  return (
    <line
      stroke={color ? resolveGeometryColor(color) : "currentColor"}
      strokeWidth={2}
      {...lineProps}
      x1={line[0][0]}
      x2={line[1][0]}
      y1={line[0][1]}
      y2={line[1][1]}
    />
  );
};
