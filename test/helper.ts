import { BigNumber } from "@ethersproject/bignumber";

export const E18 = BigNumber.from(1).pow(18);

export const minAddress = (a1: string, a2: string) => (a1 < a2 ? a1 : a2);
export const maxAddress = (a1: string, a2: string) => (a1 > a2 ? a1 : a2);
