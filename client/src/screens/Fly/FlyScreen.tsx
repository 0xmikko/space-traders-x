import React from "react";

import {Container, Row} from "react-bootstrap";
import {Layout} from "../Layout";
import {useDispatch, useSelector} from "react-redux";
import {gameSelector} from "../../store/game";

export function FlyScreen(): React.ReactElement {
  const dispatch = useDispatch();

  const { timeToArrive } = useSelector(gameSelector);

  const name = "DION ZJ97";
  const planetClassName = (name === "DION ZJ97") ? "dion" : name;

  return (
    <Layout>
      <Container fluid style={{ maxWidth: "92%" }}>
        <Row>
          <h1 className={"flyheading"}>
            FLYING TO {name} in {timeToArrive} blocks
          </h1>
          <img
            src={"/img/flyarrow.png"}
            style={{
              width: "70%",
              position: "absolute",
              left: "15%",
              bottom: "10%",
            }}
          />
          <img
            src={"/img/spaceship.png"}
            style={{
              width: "200px",
              position: "absolute",
              left: "10%",
              top: "70%",
            }}
          />
          <img
            src={`/img/spacemap-${planetClassName}.png`}
            style={{
              width: "150px",
              height: "150px",
              float: "right",
              position: "absolute",
              left: "85%",
            }}
          />
        </Row>
      </Container>
    </Layout>
  );
}
