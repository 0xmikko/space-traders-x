/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;

export interface IBEP20 extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): IBEP20;
  clone(): IBEP20;
  methods: {
    /**
     * Returns the amount of tokens in existence.
     */
    totalSupply(): NonPayableTransactionObject<string>;

    /**
     * Returns the token decimals.
     */
    decimals(): NonPayableTransactionObject<string>;

    /**
     * Returns the token symbol.
     */
    symbol(): NonPayableTransactionObject<string>;

    /**
     * Returns the token name.
     */
    name(): NonPayableTransactionObject<string>;

    /**
     * Returns the bep token owner.
     */
    getOwner(): NonPayableTransactionObject<string>;

    /**
     * Returns the amount of tokens owned by `account`.
     */
    balanceOf(account: string): NonPayableTransactionObject<string>;

    /**
     * Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transfer(
      recipient: string,
      amount: number | string
    ): NonPayableTransactionObject<boolean>;

    /**
     * Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.
     */
    allowance(
      _owner: string,
      spender: string
    ): NonPayableTransactionObject<string>;

    /**
     * Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.
     */
    approve(
      spender: string,
      amount: number | string
    ): NonPayableTransactionObject<boolean>;

    /**
     * Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transferFrom(
      sender: string,
      recipient: string,
      amount: number | string
    ): NonPayableTransactionObject<boolean>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}