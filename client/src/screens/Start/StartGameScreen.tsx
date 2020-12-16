import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import { Container, Row, Col, Button, Form, Modal, Tooltip } from 'react-bootstrap';
import {Layout} from "../Layout";


export function StartGameScreen(): React.ReactElement {
    return (
        <div>
        <img src={"./img/background-start-with-logo.png"} style={{width: "100%", position: "absolute"}} />
        <Link to="/market"><
            img src={"./img/start-button.png"} style={{left: "45%", top: "40%", position: "absolute"}} />
        </Link>
        </div>
    );
}
