import { BigNumber } from "@ethersproject/bignumber";

export const E18 = BigNumber.from(10).pow(18);
export const UINT256_MAX = BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export const minAddress = (a1: string, a2: string) => (a1 < a2 ? a1 : a2);
export const maxAddress = (a1: string, a2: string) => (a1 > a2 ? a1 : a2);

export const priceToNumber = (n: BigNumber) =>
  n.div("100000000000000").toNumber() / 10000;
