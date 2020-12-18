import React from "react";
import actions from "../../store/actions";
import {useDispatch} from "react-redux";

export function StartGameScreen(): React.ReactElement {
  const dispatch = useDispatch();
  const startGame = () => dispatch(actions.game.startGame());
  return (
    <div className={"start-game-block"}>
        <img
          src={"./img/start-button.png"}
          onClick={startGame}
          alt={"StartButton"}
        />
    </div>
  );
}
