import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Planet } from "../../core/planet";
import { SpaceMapCard } from "./SpaceMapCard";
import { useSelector } from "react-redux";
import { planetsSelector } from "../../store/planets";
import { LoadingView } from "rn-web-components";
import { PlanetOnMap } from "./PlanetOnMap";

export interface SpaceMapProps {
  show: boolean;
  setShow: (a: boolean) => void;
}

export function SpaceMapWidget({
  show,
  setShow,
}: SpaceMapProps): React.ReactElement {
  const [planet, setPlanet] = useState<Planet | undefined>(undefined);

  const { addressMap } = useSelector(planetsSelector);
  const data = Object.values(addressMap);
  if (data === undefined) return <LoadingView />;


  const planetsRendered = data.map((p) => (
    <PlanetOnMap data={p} onClick={() => setPlanet(p)} />
  ));

  return (
    <Modal centered show={show} onHide={() => setShow(false)}>
      <Modal.Body className={"spacemap"}>
        <div style={{ height: "840px", textAlign: "center" }}>
          <img
            src={"./img/spacemap-close.png"}
            className={"spacemap-close"}
            onClick={() => setShow(false)}
            alt={"closeButton"}
          />
          {planetsRendered}
          <SpaceMapCard data={planet} />
        </div>
      </Modal.Body>
    </Modal>
  );
}
