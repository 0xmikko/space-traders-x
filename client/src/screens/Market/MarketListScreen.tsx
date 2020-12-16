import React, {useState, useEffect} from "react";
import { Container, Row, Col, Button, Form, Modal, Tooltip } from 'react-bootstrap';
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {reservesSelector} from "../../store/reserves";
import {ExchangeForm} from "../../containers/Exchanges/ExchangeForm";
import AppBar from "../../components/AppBar/AppBar";
import {Footer} from "../../components/Footer/Footer";
import {Layout} from "../Layout";
import {Helmet} from "react-helmet";
import {PlanetCard} from "../../containers/Planets/PlanetCard";
import {Planet} from "../../core/planet";
import {ResourcesWidget} from "../../containers/Resources/ResourcesWidget";


export function MarketListScreen(): React.ReactElement {
  const [showSpaceMap, setShowSpaceMap] = useState(false);

  return (
    <Layout>
       <Container fluid style={{maxWidth: "92%"}}>
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
