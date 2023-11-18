import React from "react";

import { geometrySVGstyle } from "./Geometry.css";
import { type Domain, GeometryProvider } from "./core";

type GeometryProps = {
  domain: Domain;
  caption?: React.ReactElement;
} & Omit<React.SVGProps<SVGSVGElement>, "ref">;

const Geometry: React.FC<GeometryProps> = ({ domain, ...svgProps }) => {
  return (
    <GeometryProvider domain={domain}>
      <svg
        className={geometrySVGstyle}
        height={`min(100%, ${domain.y[1] - domain.y[0]}px)`}
        viewBox={`${domain.x[0]} ${domain.y[0]} ${domain.x[1]} ${domain.y[1]}`}
        width={`min(100%, ${domain.x[1] - domain.x[0]}px)`}
        {...svgProps}
      />
    </GeometryProvider>
  );
};

export default React.memo(Geometry);
