import React from "react";
import actions from "../../store/actions";
import {useDispatch} from "react-redux";

export function StartGameScreen(): React.ReactElement {
  const dispatch = useDispatch();
  const startGame = () => dispatch(actions.game.startGame());
  return (
    <div className={"start-game-block"}>
      {/*<img*/}
      {/*  src={"./img/background-start-with-logo.png"}*/}
      {/*  style={{ width: "100%", position: "absolute" }}*/}
      {/*  alt={"Logo"}*/}
      {/*/>*/}
        <img
          src={"./img/start-button.png"}
          style={{ left: "45%", top: "40%", position: "absolute" }}
          onClick={startGame}
        />
    </div>
  );
}
