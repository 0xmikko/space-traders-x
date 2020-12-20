import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ExchangeForm} from "../../containers/Exchanges/ExchangeForm";
import {Layout} from "../Layout";
import {PlanetCard} from "../../containers/Planets/PlanetCard";
import {ResourcesWidget} from "../../containers/Resources/ResourcesWidget";
import {useDispatch, useSelector} from "react-redux";
import {gameSelector} from "../../store/game";
import {planetsSelector} from "../../store/planets";
import {FailureView, LoadingView} from "rn-web-components";
import actions from "../../store/actions";

export function MarketListScreen(): React.ReactElement {
  const dispatch = useDispatch();
  const { currentPlanet } = useSelector(gameSelector);
  const {addressMap} = useSelector(planetsSelector);

  useEffect(() => {
    dispatch(actions.game.getCurrentPlanet());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentPlanet && Object.keys(addressMap).length > 0) dispatch(actions.planets.updateTokenPrices())
  }, [addressMap[currentPlanet || ""]])

  if (Object.keys(addressMap).length === 0) return <LoadingView />;
  if (currentPlanet === undefined) return <LoadingView />;

  const planet = addressMap[currentPlanet];
  if (planet === undefined)
    return <FailureView error={"Unknown planet" + currentPlanet} />;

  return (
    <Layout>
      <Container fluid style={{ maxWidth: "92%" }}>
        <Row>
          <Col sm={8}>
            <PlanetCard data={planet} />
          </Col>
          <Col sm={4}>
            <ResourcesWidget />
            <ExchangeForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
