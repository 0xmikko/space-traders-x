import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import { Container, Row, Col, Button, Form, Modal, Tooltip } from 'react-bootstrap';
import {Layout} from "../Layout";


export function FlyScreen(): React.ReactElement {
    let { name }  = useParams();
    const planetClassName = name === "DION ZJ97" ? 'dion' : name.toLowerCase();

    const [blocksCount, setBlocksCount] = useState(5);

    return (
        <Layout>
            <Container fluid style={{maxWidth: "92%"}}>
                <Row>
                    <h1 className={"flyheading"}>FLYING TO {name} in {blocksCount} blocks</h1>
                    <img
                        src={"/img/flyarrow.png"}
                        style={{width: "70%", position: "absolute", left: "15%", bottom: "10%"}}
                    />
                    <img
                        src={"/img/spaceship.png"}
                        style={{width: "200px", position: "absolute", left: "10%", top: "70%"}}
                    />
                    <img
                        src={`/img/spacemap-${planetClassName}.png`}
                        style={{width: "150px", height: "150px", float: "right", position: "absolute", left: "85%"}}
                    />
                </Row>
            </Container>
        </Layout>
    );
}
