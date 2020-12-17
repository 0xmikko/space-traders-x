import React from "react";
import { Col, Row } from "react-bootstrap";
import { Planet } from "../../core/planet";

export interface PlanetDescriptionProps {
  data: Planet;
}

export function PlanetDescription({ data }: PlanetDescriptionProps) {
  return (
    <>
      <Row>
        <Col sm={7}>
          <img src={data.image} alt={data.name} className={"planet-desc-img"} />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <p className={"planet-desc-text"}>{data.description}</p>
        </Col>
      </Row>
    </>
  );
}
