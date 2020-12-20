/*
 * Stackdrive. Self-order apps for business
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { BigNumber } from "ethers";
import moment from "moment";

export const E18 = BigNumber.from(10).pow(18);

const eDecimals = (num: number) => BigNumber.from(10).pow(num);

// export function rayRate(number: BigNumber): string {
//   return number.div(new BigNumber('1e25')).toFixed(2);
// }
//
export function tokenDecimals(
  number: BigNumber,
  decimals: number = 18
): number {
  return parseFloat(number.div(eDecimals(decimals)).toString());
}

export function numberWithCommas(x: number | undefined) {
  if (x === undefined) return "";
  const parts = x.toString().split(".");

  return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toHumanDate(d: Date | undefined | number | string): string {
  return moment(d).format("YYYY-MM-DD HH:mm");
}

export const priceToNumber = (n: BigNumber) => n.div(eDecimals(14)).toNumber() / 10000;
