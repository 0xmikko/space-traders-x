/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import {  GameActions } from "./index";
import { Game } from "../../core/game";

export const isGameStarted = (): ThunkAction<
    void,
    RootState,
    unknown,
    GameActions
    > => async (dispatch, getState) => {
  const { game } = getState().web3;
  if (game === undefined) return;
  const isGameStarted = await game.methods.
}

export const updateResources = () : ThunkAction<
    void,
    RootState,
    unknown,
    GameActions
    > => async (dispatch, getState) => {
  const { goldToken, oilToken, ironToken, accounts } = getState().web3;
  const account = accounts[0]
  if (account=== undefined || goldToken === undefined || oilToken === undefined || ironToken === undefined) {
    return;
  }
  const gold = await goldToken.methods.balanceOf(account).call();
  const iron = await ironToken.methods.balanceOf(account).call();
  const oil = await oilToken.methods.balanceOf(account).call();

}

export const getGamesList = (): ThunkAction<
  void,
  RootState,
  unknown,
  GameActions
> => async (dispatch, getState) => {
  const result: Array<Game> = [];
  const { game, planetRepository, goldToken, oilToken, ironToken } = getState().web3;
  if (game === undefined) {
    return;
  }

  const web3 = await getState().web3.web3;
  if (web3 === null) throw new Error("Web3 is null!");
  // console.log(await providerRepository?.methods.)

  const qty = parseInt(
    await gameRepository.methods.getGamesLength().call()
  );

  for (let i = 0; i < qty; i++) {
    const name = await gameRepository.methods.getGameName(i).call();
    const { x, y } = await gameRepository.methods.getGameCoord(i).call();
    // console.log('DA', data);
    result.push({
      name,
      x: parseInt(x),
      y: parseInt(y),
      description: additionalGameInfo[name].description || "",
      image: additionalGameInfo[name].image || "",
    });
  }
  dispatch({
    type: "GAMES_LIST",
    payload: result,
  });
};
