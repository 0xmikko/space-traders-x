/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import {RootState} from '../index';
import {Game} from "../../core/game";


export const gamesSelector = (state: RootState) => state.games;

export type GameActions =
  | {
      type: 'GAMES_LIST';
      payload: Array<Game>;

    }
  | {
      type: 'GAMES_FAILED';
    };

export interface AdditionalGameInfo {
    description: string,
    image: string,
}

export const additionalGameInfo : Record<string, AdditionalGameInfo> = {

}
