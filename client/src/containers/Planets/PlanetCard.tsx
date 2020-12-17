import React, {useState} from "react";
import {Planet} from "../../core/planet";
import {SpaceMapWidget} from "./SpaceMapWidget";
import {PlanetDescription} from "./PlanetDescription";
import {PlanetCardHeader} from "./PlanetCardHeader";

export interface PlanetCardProps {
  data: Planet;
}

export function PlanetCard({ data }: PlanetCardProps) {
  const [showSpaceMap, setShowSpaceMap] = useState(false);

  return (
    <>
      <PlanetCardHeader setShow={setShowSpaceMap} data={data} />
      <PlanetDescription data={data} />
      <SpaceMapWidget show={showSpaceMap} setShow={setShowSpaceMap} />
    </>
  );
}
