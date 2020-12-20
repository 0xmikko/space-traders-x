import React from "react";
import { Col, Row } from "react-bootstrap";
import { Planet } from "../../core/planet";
import { priceToNumber } from "../../utils/formaters";

export interface PlanetRatesWidgetProps {
  data: Planet;
}

export function PlanetRatesWidget({ data }: PlanetRatesWidgetProps) {
  const goldOilPrice = data.goldOilPrice
      ? priceToNumber(data.goldOilPrice).toFixed(2)
      : "-";

  const goldIronPrice = data.goldIronPrice
      ? priceToNumber(data.goldIronPrice).toFixed(2)
      : "-";

  const ironOilPrice = data.ironOilPrice
      ? priceToNumber(data.ironOilPrice).toFixed(2)
      : "-";
  return (
    <>
      <Row>
        <Col sm={4}>
          <h3 className={"planet-rates-item"}>GOLD/FUEL: {goldOilPrice}</h3>
        </Col>
        <Col sm={4}>
          <h3 className={"planet-rates-item"}>GOLD/IRON: {goldIronPrice}</h3>
        </Col>
        <Col sm={4}>
          <h3 className={"planet-rates-item"}>FUEL/IRON: {ironOilPrice}</h3>
        </Col>
      </Row>
    </>
  );
}
