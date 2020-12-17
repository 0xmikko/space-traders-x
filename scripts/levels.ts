/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import { BigNumberish } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { E18 } from "../test/helper";

export interface StarshipLevel {
  velocity: BigNumberish;
  fuelPerParsec: BigNumberish;
  gold: BigNumberish;
  iron: BigNumberish;
  oil: BigNumberish;
}

export const starShipLevels: Array<StarshipLevel> = [
  {
    velocity: 100,
    fuelPerParsec: 100,
    gold: BigNumber.from(1).mul(E18),
    iron: BigNumber.from(1).mul(E18),
    oil: BigNumber.from(1).mul(E18),
  },
];
