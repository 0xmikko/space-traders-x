import React, { useState } from "react";
import { LoadingView } from "rn-web-components";
import { Planet } from "../../core/planet";
import { SpaceMapWidget } from "./SpaceMapWidget";
import { PlanetRatesWidget } from "./PlanetRatesWidget";
import { PlanetDescription } from "./PlanetDescription";
import { PlanetCardHeader } from "./PlanetCardHeader";

export interface PlanetCardProps {
  data?: Planet;
}

export function PlanetCard({ data }: PlanetCardProps) {
  const [showSpaceMap, setShowSpaceMap] = useState(false);

  return (
    <>
      <PlanetCardHeader setShow={setShowSpaceMap} />
      <PlanetDescription />
      <SpaceMapWidget show={showSpaceMap} setShow={setShowSpaceMap} />
    </>
  );
}
