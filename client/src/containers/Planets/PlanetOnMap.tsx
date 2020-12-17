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
  return (
    <div className={`spacemap-${data.name}`}>
      <div>
        <img src={`./img/spacemap-${data.name}.png`} onClick={onClick} />
        <br />
        <h6 className={"spacemap-planet-name"}>{data.name}</h6>
      </div>
    </div>
  );
}
