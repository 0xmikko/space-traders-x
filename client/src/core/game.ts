/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */
export interface Game {
    isGameStarted: boolean,
    currentPlanet: string,
    timeToArrive: number,
    gold: number,
    number: number,
    oil: number
}
