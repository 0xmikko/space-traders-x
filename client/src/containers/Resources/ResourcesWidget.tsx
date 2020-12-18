import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ResourceItem } from "./ResourceItem";
import { useDispatch, useSelector } from "react-redux";
import { gameSelector } from "../../store/game";
import actions from "../../store/actions";

export function ResourcesWidget() {
  const dispatch = useDispatch();
  const { gold, iron, oil } = useSelector(gameSelector);

  useEffect(() => {
    dispatch(actions.game.updateResources());
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <Col sm={3}></Col>
      <Col sm={3}>
        <ResourceItem type="gold" amount={gold} />
      </Col>
      <Col sm={3}>
        <ResourceItem type="iron" amount={iron} />
      </Col>
      <Col sm={3}>
        <ResourceItem type="fuel" amount={oil} />
      </Col>
    </Row>
  );
}
