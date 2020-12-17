/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */


export interface GameResources {
    gold: number,
    iron: number,
    oil: number
}

export interface Game extends GameResources{
    isGameStarted: boolean,
    currentPlanet: string | undefined,
    timeToArrive: number,

}
