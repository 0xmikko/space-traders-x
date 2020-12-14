/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface PlanetRepositoryContract
  extends Truffle.Contract<PlanetRepositoryInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<PlanetRepositoryInstance>;
}

type AllEvents = never;

export interface PlanetRepositoryInstance extends Truffle.ContractInstance {
  addPlanet: {
    (
      planet: string,
      name: string,
      x: number | BN | string,
      y: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      planet: string,
      name: string,
      x: number | BN | string,
      y: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      planet: string,
      name: string,
      x: number | BN | string,
      y: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      planet: string,
      name: string,
      x: number | BN | string,
      y: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getPlanet(
    planet: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string; 1: BN; 2: BN }>;

  getPlanetsLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  methods: {
    addPlanet: {
      (
        planet: string,
        name: string,
        x: number | BN | string,
        y: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        planet: string,
        name: string,
        x: number | BN | string,
        y: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        planet: string,
        name: string,
        x: number | BN | string,
        y: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        planet: string,
        name: string,
        x: number | BN | string,
        y: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getPlanet(
      planet: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string; 1: BN; 2: BN }>;

    getPlanetsLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;
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