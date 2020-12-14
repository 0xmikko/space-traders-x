/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface AddressStorageContract
  extends Truffle.Contract<AddressStorageInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<AddressStorageInstance>;
}

type AllEvents = never;

export interface AddressStorageInstance extends Truffle.ContractInstance {
  getAddress(
    key: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  methods: {
    getAddress(
      key: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}