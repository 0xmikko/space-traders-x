/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */


import {BigNumber} from "@ethersproject/bignumber";

export interface GameResources {
    gold: BigNumber,
    iron: BigNumber,
    oil: BigNumber
}

export interface Game extends GameResources{
    isGameStarted: boolean,
    currentPlanet: string | undefined,
    timeToArrive: number,

}
