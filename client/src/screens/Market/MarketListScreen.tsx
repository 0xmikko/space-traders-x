import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ExchangeForm } from "../../containers/Exchanges/ExchangeForm";
import { Layout } from "../Layout";
import { PlanetCard } from "../../containers/Planets/PlanetCard";
import { ResourcesWidget } from "../../containers/Resources/ResourcesWidget";

export function MarketListScreen(): React.ReactElement {
  const [showSpaceMap, setShowSpaceMap] = useState(false);

  return (
    <Layout>
      <Container fluid style={{ maxWidth: "92%" }}>
        <Row>
          <Col sm={8}>
            <PlanetCard />
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
