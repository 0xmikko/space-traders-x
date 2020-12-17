import React from "react";
import {Col, Row} from "react-bootstrap";
import {Planet} from "../../core/planet";
import {PlanetRatesWidget} from "./PlanetRatesWidget";

export interface PlanetCardHeaderProps {
  setShow: (a: boolean) => void;
  data: Planet;
}

export function PlanetCardHeader({ setShow, data }: PlanetCardHeaderProps) {
  return (
    <React.Fragment>
      <Row>
        <Col sm={9}>
          <h2 className={"planet-card-header"}>{data.name}</h2>
          <PlanetRatesWidget />
        </Col>
        <Col sm={3}>
          <img src={"./img/spacemapbtn.png"} onClick={() => setShow(true)} />
        </Col>
      </Row>
    </React.Fragment>
  );
}
