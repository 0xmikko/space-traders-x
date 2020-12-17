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
    name: "VICRION",
    x: 530,
    y: 460,
    initGold: BigNumber.from(1000000).mul(E18),
    generatesGold: BigNumber.from(1000).mul(E18),
    initIron: BigNumber.from(1000000).mul(E18),
    generatesIron: BigNumber.from(1000).mul(E18),
    initOil: BigNumber.from(10000).mul(E18),
    generatesOil: BigNumber.from(10).mul(E18),
  },
  {
    name: "GOCURY",
    x: 370,
    y: 60,
    initGold: BigNumber.from(10000).mul(E18),
    generatesGold: BigNumber.from(100).mul(E18),
    initIron: BigNumber.from(1000).mul(E18),
    generatesIron: BigNumber.from(1).mul(E18),
    initOil: BigNumber.from(1000).mul(E18),
    generatesOil: BigNumber.from(1).mul(E18),
  },
  {
    name: "UITANIA",
    x: 790,
    y: 100,
    initGold: BigNumber.from(1000000).mul(E18),
    generatesGold: BigNumber.from(10000).mul(E18),
    initIron: BigNumber.from(100000).mul(E18),
    generatesIron: BigNumber.from(1000).mul(E18),
    initOil: BigNumber.from(1000).mul(E18),
    generatesOil: BigNumber.from(1).mul(E18),
  },
  {
    name: "DION ZJ97",
    x: 1030,
    y: 300,
    initGold: BigNumber.from(1000).mul(E18),
    generatesGold: BigNumber.from(1).mul(E18),
    initIron: BigNumber.from(1000).mul(E18),
    generatesIron: BigNumber.from(1).mul(E18),
    initOil: BigNumber.from(10000000).mul(E18),
    generatesOil: BigNumber.from(100000).mul(E18),
  },
  {
    name: "OCAO",
    x: 930,
    y: 500,
    initGold: BigNumber.from(1000).mul(E18),
    generatesGold: BigNumber.from(1).mul(E18),
    initIron: BigNumber.from(1000).mul(E18),
    generatesIron: BigNumber.from(1).mul(E18),
    initOil: BigNumber.from(1000).mul(E18),
    generatesOil: BigNumber.from(1).mul(E18),
  },
  {
    name: "THUBEON",
    x: 1100,
    y: 120,
    initGold: BigNumber.from(100000).mul(E18),
    generatesGold: BigNumber.from(100).mul(E18),
    initIron: BigNumber.from(1000000).mul(E18),
    generatesIron: BigNumber.from(1000).mul(E18),
    initOil: BigNumber.from(1000000).mul(E18),
    generatesOil: BigNumber.from(10000).mul(E18),
  },
  {
    name: "ZUTIS",
    x: 1020,
    y: 520,
    initGold: BigNumber.from(100).mul(E18),
    generatesGold: BigNumber.from(1).mul(E18),
    initIron: BigNumber.from(10000).mul(E18),
    generatesIron: BigNumber.from(1000).mul(E18),
    initOil: BigNumber.from(100).mul(E18),
    generatesOil: BigNumber.from(10).mul(E18),
  },
];
