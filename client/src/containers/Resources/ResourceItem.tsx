import React from "react";
import {Col, Row} from "react-bootstrap";
import {Resource} from "../../core/resource";

export interface ResourceItemProps {
    data?: Resource;
}

export function ResourceItem({data}: ResourceItemProps) {
    return (
        <React.Fragment>
            <div className={"resourceItem"}>
                <img
                    src={`./img/${data.type}.png`}
                />
                <p>${data.amount}</p>
            </div>
        </React.Fragment>
    );
}
