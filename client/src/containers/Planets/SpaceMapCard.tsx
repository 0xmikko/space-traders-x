import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import {Modal, Button} from "react-bootstrap";
import {Planet} from "../../core/planet";

export interface SpaceMapCardProps {
    data?: Planet;
}

export function SpaceMapCard({setShow, data}: SpaceMapCardProps) {
    const history = useHistory();

    const hide = () => {
        const card = document.querySelector('.spacemap-planet-card');
        card.classList.remove("visible");
        let path = `/fly/${data.name}`;
        history.push(path);
    };

    return (
        <React.Fragment>
            <div className={"spacemap-planet-card"}>
                <h3>{data.name}</h3><br />
                <p>distance: 100 parsec</p><br />
                <p>GOLD/FUEL: 1.29</p>
                <p>GOLD/FUEL: 1.29</p><br />
                <Button className={"moveButton"} onClick={hide}>MOVE THERE</Button><br /><br />
                <p>Fuel consumption: 50</p>
                <p>Time to there: 3 blocks</p><br />
            </div>
        </React.Fragment>
    );
}
