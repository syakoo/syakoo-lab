import { useMemo } from "react";
import { useGeometry, type PointData, points2Coordinates } from "./core";
import { type ColorKey, resolveGeometryColor } from "./core";

type PlaneProps = {
  points: PointData[];
  color?: ColorKey;
} & Omit<React.SVGProps<SVGPolygonElement>, "points">;

export const Plane: React.FC<PlaneProps> = ({
  points,
  color,
  ...polygonProps
}) => {
  const storedPoints = useGeometry().points;

  const polygon = useMemo(() => {
    return points2Coordinates(points, storedPoints);
  }, [storedPoints, points]);

  if (!polygon) return null;

  return (
    <polygon
      {...polygonProps}
      fill={color ? resolveGeometryColor(color) : "currentColor"}
      points={polygon.map(([x, y]) => `${x}, ${y}`).join(" ")}
      stroke={color ? resolveGeometryColor(color) : "currentColor"}
    />
  );
};
