import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../store/actions";
import {gameSelector} from "../store/game";
import {StartGameScreen} from "./Start/StartGameScreen";
import {FlySwitcher} from "./FlySwitcher";

export function StartGameSwitcher(): React.ReactElement {
  const dispatch = useDispatch();
  const { isGameStarted } = useSelector(gameSelector);

  useEffect(() => {
    dispatch(actions.game.isGameStarted());
  }, []);
  if (isGameStarted) {
    return <FlySwitcher />;
  } else {
    return <StartGameScreen />;
  }
}
