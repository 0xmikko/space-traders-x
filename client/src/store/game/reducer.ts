/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import {GameActions} from "./index";
import {Game} from "../../core/game";

export interface GameState extends Game {}

const initialState: GameState = {
  isGameStarted: false,
  currentPlanet: undefined,
  gold: 0,
  iron: 0,
  oil: 0,
  timeToArrive: 0,
};

export default function createReducer(
  state: GameState = initialState,
  action: GameActions
): GameState {
  switch (action.type) {
    case "GAME_UPDATE_STATUS":
      return {
        ...state,
        isGameStarted: action.payload
      };
    case "GAME_UPDATE_RESOURCES":
      return {
        ...state,
        ...action.payload
      };
    case "GAME_CURRENT_PLANET":
      return {
        ...state,
        currentPlanet: action.payload.toLocaleLowerCase()
      }
  }

  return state;
}
