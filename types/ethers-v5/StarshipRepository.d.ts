/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface StarshipRepositoryInterface extends ethers.utils.Interface {
  functions: {
    "addStarshipLevel(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "calculateFuelConsumption(address,uint256)": FunctionFragment;
    "calculateTimeToArrive(address,uint256)": FunctionFragment;
    "getAccountPlanet(address)": FunctionFragment;
    "getAccountStartshipProperties(address)": FunctionFragment;
    "getLevelsLength()": FunctionFragment;
    "isAccountExists(address)": FunctionFragment;
    "moveToPlanet(address,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "registerAccount(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "timeToArrive(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "upgradeStarShip(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addStarshipLevel",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateFuelConsumption",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateTimeToArrive",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAccountPlanet",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAccountStartshipProperties",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getLevelsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isAccountExists",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "moveToPlanet",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerAccount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timeToArrive",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeStarShip",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "addStarshipLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateFuelConsumption",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateTimeToArrive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccountPlanet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccountStartshipProperties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLevelsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAccountExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "moveToPlanet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timeToArrive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeStarShip",
    data: BytesLike
  ): Result;

  events: {
    "Move(address,address,address)": EventFragment;
    "NewStarShip(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Upgrade(address,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Move"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewStarShip"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgrade"): EventFragment;
}

export class StarshipRepository extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: StarshipRepositoryInterface;

  functions: {
    addStarshipLevel(
      velocity: BigNumberish,
      fuelPerParsec: BigNumberish,
      gold: BigNumberish,
      iron: BigNumberish,
      oil: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "addStarshipLevel(uint256,uint256,uint256,uint256,uint256)"(
      velocity: BigNumberish,
      fuelPerParsec: BigNumberish,
      gold: BigNumberish,
      iron: BigNumberish,
      oil: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    calculateFuelConsumption(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "calculateFuelConsumption(address,uint256)"(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calculateTimeToArrive(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "calculateTimeToArrive(address,uint256)"(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAccountPlanet(
      account: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "getAccountPlanet(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getAccountStartshipProperties(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber] & {
        level: number;
        velocity: BigNumber;
        fuelPerParsec: BigNumber;
      }
    >;

    "getAccountStartshipProperties(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber] & {
        level: number;
        velocity: BigNumber;
        fuelPerParsec: BigNumber;
      }
    >;

    getLevelsLength(overrides?: CallOverrides): Promise<[number]>;

    "getLevelsLength()"(overrides?: CallOverrides): Promise<[number]>;

    isAccountExists(
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isAccountExists(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    moveToPlanet(
      account: string,
      dstPlanet: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "moveToPlanet(address,address)"(
      account: string,
      dstPlanet: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    registerAccount(
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "registerAccount(address)"(
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    timeToArrive(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "timeToArrive(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    upgradeStarShip(
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "upgradeStarShip(address)"(
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  addStarshipLevel(
    velocity: BigNumberish,
    fuelPerParsec: BigNumberish,
    gold: BigNumberish,
    iron: BigNumberish,
    oil: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "addStarshipLevel(uint256,uint256,uint256,uint256,uint256)"(
    velocity: BigNumberish,
    fuelPerParsec: BigNumberish,
    gold: BigNumberish,
    iron: BigNumberish,
    oil: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  calculateFuelConsumption(
    account: string,
    distance: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "calculateFuelConsumption(address,uint256)"(
    account: string,
    distance: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateTimeToArrive(
    account: string,
    distance: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "calculateTimeToArrive(address,uint256)"(
    account: string,
    distance: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAccountPlanet(account: string, overrides?: CallOverrides): Promise<string>;

  "getAccountPlanet(address)"(
    account: string,
    overrides?: CallOverrides
  ): Promise<string>;

  getAccountStartshipProperties(
    account: string,
    overrides?: CallOverrides
  ): Promise<
    [number, BigNumber, BigNumber] & {
      level: number;
      velocity: BigNumber;
      fuelPerParsec: BigNumber;
    }
  >;

  "getAccountStartshipProperties(address)"(
    account: string,
    overrides?: CallOverrides
  ): Promise<
    [number, BigNumber, BigNumber] & {
      level: number;
      velocity: BigNumber;
      fuelPerParsec: BigNumber;
    }
  >;

  getLevelsLength(overrides?: CallOverrides): Promise<number>;

  "getLevelsLength()"(overrides?: CallOverrides): Promise<number>;

  isAccountExists(account: string, overrides?: CallOverrides): Promise<boolean>;

  "isAccountExists(address)"(
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  moveToPlanet(
    account: string,
    dstPlanet: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "moveToPlanet(address,address)"(
    account: string,
    dstPlanet: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  registerAccount(
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "registerAccount(address)"(
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  timeToArrive(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  "timeToArrive(address)"(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  upgradeStarShip(
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "upgradeStarShip(address)"(
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    addStarshipLevel(
      velocity: BigNumberish,
      fuelPerParsec: BigNumberish,
      gold: BigNumberish,
      iron: BigNumberish,
      oil: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "addStarshipLevel(uint256,uint256,uint256,uint256,uint256)"(
      velocity: BigNumberish,
      fuelPerParsec: BigNumberish,
      gold: BigNumberish,
      iron: BigNumberish,
      oil: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    calculateFuelConsumption(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateFuelConsumption(address,uint256)"(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateTimeToArrive(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateTimeToArrive(address,uint256)"(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountPlanet(
      account: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "getAccountPlanet(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getAccountStartshipProperties(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber] & {
        level: number;
        velocity: BigNumber;
        fuelPerParsec: BigNumber;
      }
    >;

    "getAccountStartshipProperties(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber] & {
        level: number;
        velocity: BigNumber;
        fuelPerParsec: BigNumber;
      }
    >;

    getLevelsLength(overrides?: CallOverrides): Promise<number>;

    "getLevelsLength()"(overrides?: CallOverrides): Promise<number>;

    isAccountExists(
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isAccountExists(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    moveToPlanet(
      account: string,
      dstPlanet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "moveToPlanet(address,address)"(
      account: string,
      dstPlanet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    registerAccount(account: string, overrides?: CallOverrides): Promise<void>;

    "registerAccount(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    timeToArrive(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "timeToArrive(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeStarShip(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        gold: BigNumber;
        iron: BigNumber;
        oil: BigNumber;
      }
    >;

    "upgradeStarShip(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        gold: BigNumber;
        iron: BigNumber;
        oil: BigNumber;
      }
    >;
  };

  filters: {
    Move(account: null, from: null, to: null): EventFilter;

    NewStarShip(account: null): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    Upgrade(account: null, newLevel: null): EventFilter;
  };

  estimateGas: {
    addStarshipLevel(
      velocity: BigNumberish,
      fuelPerParsec: BigNumberish,
      gold: BigNumberish,
      iron: BigNumberish,
      oil: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "addStarshipLevel(uint256,uint256,uint256,uint256,uint256)"(
      velocity: BigNumberish,
      fuelPerParsec: BigNumberish,
      gold: BigNumberish,
      iron: BigNumberish,
      oil: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    calculateFuelConsumption(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateFuelConsumption(address,uint256)"(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateTimeToArrive(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateTimeToArrive(address,uint256)"(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountPlanet(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAccountPlanet(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountStartshipProperties(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAccountStartshipProperties(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLevelsLength(overrides?: CallOverrides): Promise<BigNumber>;

    "getLevelsLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    isAccountExists(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isAccountExists(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    moveToPlanet(
      account: string,
      dstPlanet: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "moveToPlanet(address,address)"(
      account: string,
      dstPlanet: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    registerAccount(account: string, overrides?: Overrides): Promise<BigNumber>;

    "registerAccount(address)"(
      account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    timeToArrive(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "timeToArrive(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    upgradeStarShip(account: string, overrides?: Overrides): Promise<BigNumber>;

    "upgradeStarShip(address)"(
      account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addStarshipLevel(
      velocity: BigNumberish,
      fuelPerParsec: BigNumberish,
      gold: BigNumberish,
      iron: BigNumberish,
      oil: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "addStarshipLevel(uint256,uint256,uint256,uint256,uint256)"(
      velocity: BigNumberish,
      fuelPerParsec: BigNumberish,
      gold: BigNumberish,
      iron: BigNumberish,
      oil: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    calculateFuelConsumption(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calculateFuelConsumption(address,uint256)"(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateTimeToArrive(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calculateTimeToArrive(address,uint256)"(
      account: string,
      distance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountPlanet(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAccountPlanet(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountStartshipProperties(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAccountStartshipProperties(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLevelsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getLevelsLength()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isAccountExists(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isAccountExists(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    moveToPlanet(
      account: string,
      dstPlanet: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "moveToPlanet(address,address)"(
      account: string,
      dstPlanet: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registerAccount(
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "registerAccount(address)"(
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    timeToArrive(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "timeToArrive(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    upgradeStarShip(
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "upgradeStarShip(address)"(
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
