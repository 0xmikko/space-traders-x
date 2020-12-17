import React from "react";
import { Col, Row } from "react-bootstrap";
import { Planet } from "../../core/planet";

export interface PlanetRatesWidgetProps {
  data?: Planet;
}

export function PlanetRatesWidget({ data }: PlanetRatesWidgetProps) {
  return (
    <React.Fragment>
      <Row>
        <Col sm={4}>
          <h3 className={"planet-rates-item"}>GOLD/FUEL: 1.23</h3>
        </Col>
        <Col sm={4}>
          <h3 className={"planet-rates-item"}>GOLD/IRON: 2.23</h3>
        </Col>
        <Col sm={4}>
          <h3 className={"planet-rates-item"}>FUEL/IRON: 2.22</h3>
        </Col>
      </Row>
    </React.Fragment>
  );
}
