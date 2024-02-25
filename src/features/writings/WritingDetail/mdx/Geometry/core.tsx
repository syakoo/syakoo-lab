import { createContext, useContext, useState, useCallback } from "react";

import { theme } from "@/design-system/theme.css";

// __________
// Utility Types
export type Coordinates = [number, number];

export type Domain = {
  x: [number, number];
  y: [number, number];
};

export type PointId = string;
export type PointData = Coordinates | PointId;

// __________
// Context
type StoredPoints = Record<string, Coordinates>;

export const GeometryContext = createContext<{
  domain: Domain;
  points: StoredPoints;
  setPoint: (id: PointId, coordinates: Coordinates) => void;
}>({
  domain: { x: [0, 0], y: [0, 0] },
  points: {},
  setPoint: () => {
    return "";
  },
});

export function useGeometry() {
  return useContext(GeometryContext);
}

type GeometryProviderProps = {
  domain: Domain;
  children: React.ReactNode;
};

export const GeometryProvider: React.FC<GeometryProviderProps> = ({
  domain,
  children,
}) => {
  const [points, setPoints] = useState<StoredPoints>({});

  const setPoint = useCallback((id: PointId, coordinates: Coordinates) => {
    setPoints((prev) => {
      return { ...prev, [id]: coordinates };
    });
  }, []);

  return (
    <GeometryContext.Provider value={{ domain, points, setPoint }}>
      {children}
    </GeometryContext.Provider>
  );
};

// __________
// Utility Functions
export function points2Coordinates(
  points: PointData[],
  storedPoints: StoredPoints,
): Coordinates[] | null {
  const ps = [...points];

  for (let i = 0; i < ps.length; i += 1) {
    const pi = ps[i];
    if (typeof pi === "string") {
      if (!(pi in storedPoints)) {
        return null;
      }
      ps[i] = storedPoints[pi];
    }
  }

  return ps as Coordinates[];
}

const colorMap = {
  primary: theme.color.brand.primary,
  secondary: theme.color.brand.secondary,
  info: theme.color.accent.info.foreground,
  success: theme.color.accent.success.foreground,
  error: theme.color.accent.error.foreground,
  text: theme.color.text.primary,
  textSecondary: theme.color.text.secondary,
  textTertiary: theme.color.text.tertiary,
};
export type ColorKey = keyof typeof colorMap | `#${string}`;
export const resolveGeometryColor = (colorKey: ColorKey): string => {
  if (colorKey.startsWith("#")) {
    return colorKey;
  }
  return colorMap[colorKey as keyof typeof colorMap];
};
