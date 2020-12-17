/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import { BigNumberish } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { E18 } from "../test/helper";

export interface Planet {
  name: string;
  x: number;
  y: number;
  initGold: BigNumberish;
  generatesGold: BigNumberish;
  initIron: BigNumberish;
  generatesIron: BigNumberish;
  initOil: BigNumberish;
  generatesOil: BigNumberish;
}

export const planetsList: Array<Planet> = [
  {
    name: "",
    x: 500,
    y: 200,
    initGold: BigNumber.from(1).mul(E18),
    generatesGold: BigNumber.from(1).mul(E18),
    initIron: BigNumber.from(1).mul(E18),
    generatesIron: BigNumber.from(1).mul(E18),
    initOil: BigNumber.from(1).mul(E18),
    generatesOil: BigNumber.from(1).mul(E18),
  },
];
