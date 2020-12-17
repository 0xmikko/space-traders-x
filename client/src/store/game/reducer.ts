/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import { GameActions } from "./index";
import { Game } from "../../core/game";

export interface GameState {
  data: Array<Game>;
}

const initialState: GameState = {
  data: [],
};

export default function createReducer(
  state: GameState = initialState,
  action: GameActions
): GameState {
  switch (action.type) {
    case "GAMES_LIST":
      return {
        data: action.payload,
      };
    case "GAMES_FAILED":
      return {
        data: [],
      };
  }

  return state;
}
