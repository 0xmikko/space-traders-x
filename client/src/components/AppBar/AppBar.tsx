/*
 * Lean tool - hypothesis testing application
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from "react";
import {Nav, Navbar, Button, Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import {AppBarElement} from "./AppBarElement";
import {useSelector} from "react-redux";
import {web3Selector} from "../../store/web3";
import * as blockies from 'blockies-ts';


export interface AppBarProps {
  backgroundColor?: string;
}

export const AppBar = ({backgroundColor}: AppBarProps) => {

  const accounts = useSelector(web3Selector).accounts;
  const address = accounts.length >0 ? accounts[0] : "";
  const imgSrc = blockies.create({ seed: address }).toDataURL();

  return (
    <Navbar
      expand="md"
      style={{backgroundColor: "#313652 !important"}}
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
