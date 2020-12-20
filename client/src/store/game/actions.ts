/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {GameActions} from "./index";

export const isGameStarted = (): ThunkAction<
  void,
  RootState,
  unknown,
  GameActions
> => async (dispatch, getState) => {
  const { account, starshipRepository } = getState().web3;

  if (account === undefined || starshipRepository === undefined) return;
  const isGameStarted = await starshipRepository.isAccountExists(account);
  dispatch({ type: "GAME_UPDATE_STATUS", payload: isGameStarted });
};

export const startGame = (): ThunkAction<
  void,
  RootState,
  unknown,
  GameActions
> => async (dispatch, getState) => {
  const { account, game } = getState().web3;
  if (account === undefined || game === undefined) return;
  await game.startGame();
  dispatch(isGameStarted());
};

export const updateResources = (): ThunkAction<
  void,
  RootState,
  unknown,
  GameActions
> => async (dispatch, getState) => {
  const { goldToken, oilToken, ironToken, account } = getState().web3;
  if (
    account === undefined ||
    goldToken === undefined ||
    oilToken === undefined ||
    ironToken === undefined
  ) {
    return;
  }
  const gold = await goldToken.balanceOf(account);
  const iron = await ironToken.balanceOf(account);
  const oil = await oilToken.balanceOf(account);

  dispatch({
    type: "GAME_UPDATE_RESOURCES",
    payload: {
      gold,
      iron,
      oil,
    },
  });
};

export const move = (
  planet: string
): ThunkAction<void, RootState, unknown, GameActions> => async (
  dispatch,
  getState
) => {
  const { game, account } = getState().web3;
  if (account === undefined || game === undefined) return;
  await game.move(planet);
};

export const updateTimeToArrive = (): ThunkAction<
  void,
  RootState,
  unknown,
  GameActions
> => async (dispatch, getState) => {
  const { account, starshipRepository } = getState().web3;
  if (account === undefined || starshipRepository === undefined) return;
  await starshipRepository.timeToArrive(account);
};

export const getCurrentPlanet = (): ThunkAction<
  void,
  RootState,
  unknown,
  GameActions
> => async (dispatch, getState) => {
  const { account, starshipRepository } = getState().web3;

  if (account === undefined || starshipRepository === undefined) return;

  const planetAddress = await starshipRepository.getAccountPlanet(account)
  dispatch({
    type: "GAME_CURRENT_PLANET",
    payload: planetAddress,
  });
};
