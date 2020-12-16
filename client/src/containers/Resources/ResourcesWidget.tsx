import React from "react";
import {Col, Row} from "react-bootstrap";
import {Resource} from "../../core/resource";
import {ResourceItem} from "./ResourceItem";

export interface ResourcesWidgetProps {
    data?: Array<Resource>;
}

export function ResourcesWidget({data}: ResourcesWidgetProps) {
    return (
        <React.Fragment>
            <Row>
                <Col sm={3}></Col>
                <Col sm={3}>
                    <ResourceItem data={{type: "gold", amount: 100}} />
                </Col>
                <Col sm={3}>
                    <ResourceItem data={{type: "iron", amount: 100}} />
                </Col>
                <Col sm={3}>
                    <ResourceItem data={{type: "fuel", amount: 100}} />
                </Col>
            </Row>
        </React.Fragment>
    );
}
