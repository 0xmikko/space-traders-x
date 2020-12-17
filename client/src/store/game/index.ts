/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import { RootState } from "../index";
import { Game, GameResources } from "../../core/game";

export const gameSelector = (state: RootState) => state.game;

export type GameActions =
  | {
      type: "GAME_UPDATE_STATUS";
      payload: boolean;
    }
  | {
      type: "GAME_UPDATE_RESOURCES";
      payload: GameResources;
    };
