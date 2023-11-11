import { useMount } from "@/utils/mount/useMount";

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

  useMount(() => {
    if (id) setPoint(id, [x, y]);
  });

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
