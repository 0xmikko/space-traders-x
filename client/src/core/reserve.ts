/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import {BigNumber} from 'bignumber.js';

export interface Reserve {
  reserve: string,
  symbol: string,
  totalLiquidity: BigNumber;
  availableLiquidity: BigNumber;
  loanToValue: BigNumber;
  liquidationThreshold: BigNumber;
  liquidationBonus: BigNumber;
  borrowRate: BigNumber;
  lendingRate: BigNumber;
  vTokenContract: string;
  isActive: boolean;
}
