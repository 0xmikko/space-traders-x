import React from "react";
import {Col, Row} from "react-bootstrap";
import {Planet} from "../../core/planet";

export interface PlanetDescriptionProps {
    data?: Planet;
}

export function PlanetDescription({data}: PlanetDescriptionProps) {
    return (
        <React.Fragment>
            <Row>
                <Col sm={7}>
                    <img
                        src={"./img/1.jpeg"}
                        alt={"Platen kukan"}
                        className={"planet-desc-img"}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <p className={"planet-desc-text"}>Planet Kukan is a big fucking planet with a lot of oil and fucking gold.
                        You can suck a lot of dicks in a gay bar or in another fucking place.
                        Also, you can get some big cocks into your ass and fat women can make some shit on your face.</p>
                </Col>
            </Row>
        </React.Fragment>
    );
}
