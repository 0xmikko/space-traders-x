/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import React from "react";
import {Planet} from "../../core/planet";

export interface PlanetOnMapProps {
  data: Planet;
  onClick: () => void;
}


export function PlanetOnMap({
  data,
  onClick,
}: PlanetOnMapProps): React.ReactElement {
  const planetName = data.name === "DION ZJ97" ? "dion" : data.name.toLowerCase();
  return (
    <div className={`spacemap-${planetName}`}>
      <div>
        <img src={`./img/spacemap-${planetName}.png`} onClick={onClick} />
        <br />
        <h6 className={"spacemap-planet-name"}>{data.name}</h6>
      </div>
    </div>
  );
}
