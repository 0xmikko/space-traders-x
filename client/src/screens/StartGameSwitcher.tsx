import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FailureView, LoadingView } from "rn-web-components";
import { web3Selector } from "../store/web3";
import { Router } from "./Router";
import actions from "../store/actions";
import { Web3Connect } from "../components/Web3Connect";
import { gameSelector } from "../store/game";
import { Button } from "react-bootstrap";
import { StartGameScreen } from "./Start/StartGameScreen";

export function StartGameSwitcher(): React.ReactElement {
  const dispatch = useDispatch();
  const { isGameStarted } = useSelector(gameSelector);

  useEffect(() => {
    dispatch(actions.game.isGameStarted());
  }, []);
  if (isGameStarted) {
    return <Router />;
  } else {
    return <StartGameScreen />;
  }
}
