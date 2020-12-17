import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {Planet} from "../../core/planet";
import {SpaceMapCard} from "./SpaceMapCard";
import {useDispatch, useSelector} from "react-redux";
import {planetsSelector} from "../../store/planets";
import {LoadingView} from "rn-web-components";
import {PlanetOnMap} from "./PlanetOnMap";

export interface SpaceMapProps {
  show: boolean;
  setShow: (a: boolean) => void;
}

export function SpaceMapWidget({
  show,
  setShow,
}: SpaceMapProps): React.ReactElement {
  const dispatch = useDispatch();
  const [planet, setPlanet] = useState<Planet | undefined>(undefined);

  const { data } = useSelector(planetsSelector);
  if (data === undefined) return <LoadingView />;

  const setShowCard = (p: Planet) => {
    const card = document.querySelector(".spacemap-planet-card");
    setPlanet(p);
    // @ts-ignore
    card.classList.add("visible");
    // @ts-ignore
    card.style.left = p.x + "px";
    // @ts-ignore
    card.style.top = p.y + "px";
  };

  const planetsRendered = data.map((p) => (
    <PlanetOnMap data={p} onClick={() => setShowCard(p)} />
  ));

  return (
    <Modal centered show={show} onHide={() => setShow(false)}>
      <Modal.Body className={"spacemap"}>
        <div style={{ height: "840px", textAlign: "center" }}>
          <img
            src={"./img/spacemap-close.png"}
            className={"spacemap-close"}
            onClick={() => setShow(false)}
          />
          {planetsRendered}
          <SpaceMapCard data={planet} />
        </div>
      </Modal.Body>
    </Modal>
  );
}
