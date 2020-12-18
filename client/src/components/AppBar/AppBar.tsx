/*
 * Lean tool - hypothesis testing application
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from "react";
import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";


export interface AppBarProps {
  backgroundColor?: string;
}

export const AppBar = ({backgroundColor}: AppBarProps) => {

  // const accounts = useSelector(web3Selector).accounts;
  // const address = accounts.length >0 ? accounts[0] : "";

  return (
    <Navbar
      expand="md"
      style={{backgroundColor: backgroundColor || "#313652 !important"}}
    >
      <Container fluid style={{maxWidth: "92%"}}>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={"/logo.png"}
              alt={"Logo"}
              className={"navbar-image"}
              style={{cursor: "pointer"}}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default AppBar;
