import React from "react";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Planet} from "../../core/planet";
import {LoadingView} from "rn-web-components";

export interface SpaceMapCardProps {
  data?: Planet;
}

export function SpaceMapCard({ data }: SpaceMapCardProps) {
  const history = useHistory();

  if (data === undefined) return <LoadingView />;

  const move = () => {
    const card = document.querySelector(".spacemap-planet-card");
    // @ts-ignore
    card.classList.remove("visible");
    let path = `/fly/${data.name}`;
    history.push(path);
  };

  return (
    <div className={"spacemap-planet-card"}>
      <h3>{data.name}</h3>
      <br />
      <p>distance: 100 parsec</p>
      <br />
      <p>GOLD/IRON: {data.goldIronPrice}</p>
      <p>GOLD/FUEL: {data.goldOilPrice}</p>
      <p>IRON/FUEL: {data.ironOilPrice}</p>
      <br />
      <Button className={"moveButton"} onClick={move}>
        MOVE THERE
      </Button>
      <br />
      <br />
      <p>Fuel consumption: 50</p>
      <p>Time to there: 3 blocks</p>
      <br />
    </div>
  );
}
