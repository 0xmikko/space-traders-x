/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { GameActions } from "./index";
import { Game } from "../../core/game";

export const isGameStarted = (): ThunkAction<
  void,
  RootState,
  unknown,
  GameActions
> => async (dispatch, getState) => {
  const { accounts, starshipRepository } = getState().web3;

  const account = accounts[0];
  if (account === undefined || starshipRepository === undefined) return;
  const isGameStarted = await starshipRepository.methods
    .isAccountExists(account)
    .call();
};

export const updateResources = (): ThunkAction<
  void,
  RootState,
  unknown,
  GameActions
> => async (dispatch, getState) => {
  const { goldToken, oilToken, ironToken, accounts } = getState().web3;
  const account = accounts[0];
  if (
    account === undefined ||
    goldToken === undefined ||
    oilToken === undefined ||
    ironToken === undefined
  ) {
    return;
  }
  const gold = parseInt(await goldToken.methods.balanceOf(account).call());
  const iron = parseInt(await ironToken.methods.balanceOf(account).call());
  const oil = parseInt(await oilToken.methods.balanceOf(account).call());

  dispatch({
    type: "GAME_UPDATE_RESOURCES",
    payload: {
      gold,
      iron,
      oil,
    },
  });
};

