/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

export interface Token {
    address: string,
    name: string,
    symbol: string,
    balance: number,
    allowance: number,
    totalSupply: number,
}
