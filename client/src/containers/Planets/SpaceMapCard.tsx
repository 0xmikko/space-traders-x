import React from "react";
import {Button} from "react-bootstrap";
import {Planet} from "../../core/planet";
import {LoadingView} from "rn-web-components";
import {useDispatch} from "react-redux";
import actions from "../../store/actions";

export interface SpaceMapCardProps {
  data?: Planet;
}

export function SpaceMapCard({ data }: SpaceMapCardProps) {
  const dispatch = useDispatch();

  // if (data === undefined) return <div />;
    console.log("JJ",data)
  const move = () => {
    // const card = document.querySelector(".spacemap-planet-card");
    // // @ts-ignore
    // card.classList.remove("visible");
    if (data?.address) dispatch(actions.game.move(data.address))
  };

    const visible = data === undefined ? "" : "visible"

    return (
    <div className={`spacemap-planet-card ${visible}`} style={{
        left: data?.x,
        top: data?.y,
    }}>
      <h3>{data?.name}</h3>
      <br />
      <p>distance: 100 parsec</p>
      <br />
      <p>GOLD/IRON: {data?.goldIronPrice}</p>
      <p>GOLD/FUEL: {data?.goldOilPrice}</p>
      <p>IRON/FUEL: {data?.ironOilPrice}</p>
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
