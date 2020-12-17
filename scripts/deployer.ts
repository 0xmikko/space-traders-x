// @ts-ignore
import { ethers } from "hardhat";

import { AddressRepository } from "../types/ethers-v5/AddressRepository";
import { AddressRepository__factory } from "../types/ethers-v5/factories/AddressRepository__factory";

import { PlanetRepository } from "../types/ethers-v5/PlanetRepository";
import { PlanetRepository__factory } from "../types/ethers-v5/factories/PlanetRepository__factory";

import { Planet } from "../types/ethers-v5/Planet";
import { Planet__factory } from "../types/ethers-v5/factories/Planet__factory";
import { StarshipRepository__factory } from "../types/ethers-v5/factories/StarshipRepository__factory";
import { StarshipRepository } from "../types/ethers-v5/StarshipRepository";

import { ResourceToken } from "../types/ethers-v5/ResourceToken";
import { ResourceToken__factory } from "../types/ethers-v5/factories/ResourceToken__factory";

import { ResourcePair } from "../types/ethers-v5/ResourcePair";
import { ResourcePair__factory } from "../types/ethers-v5/factories/ResourcePair__factory";

import { SpaceTradersGame } from "../types/ethers-v5/SpaceTradersGame";
import { SpaceTradersGame__factory } from "../types/ethers-v5/factories/SpaceTradersGame__factory";
import { BigNumberish } from "ethers";

export class Deployer {
  private _show: boolean;
  private _addressRepository: AddressRepository | undefined;
  private _planetRepository: PlanetRepository | undefined;
  private _starshipRepository: StarshipRepository | undefined;

  private _goldToken: ResourceToken | undefined;
  private _ironToken: ResourceToken | undefined;
  private _oilToken: ResourceToken | undefined;

  constructor(show: boolean = false) {
    this._show = show;
  }

  async getAddressRepository(): Promise<AddressRepository> {
    if (this._addressRepository) return this._addressRepository;
    const addressRepositoryArtifact = (await ethers.getContractFactory(
      "AddressRepository"
    )) as AddressRepository__factory;
    if (this._show) console.log("Deploying addressRepository");
    this._addressRepository = (await addressRepositoryArtifact.deploy()) as AddressRepository;
    await this._addressRepository.deployed();

    return this._addressRepository;
  }

  async getPlanetRepository(): Promise<PlanetRepository> {
    if (this._planetRepository !== undefined) return this._planetRepository;

    const planetRepositoryArtifact = (await ethers.getContractFactory(
      "PlanetRepository"
    )) as PlanetRepository__factory;

    if (this._show) console.log("Deploying planetRepository");
    this._planetRepository = (await planetRepositoryArtifact.deploy()) as PlanetRepository;
    await this._planetRepository.deployed();

    // Add PlanetRepository to AddressRepository
    const addressRepository = await this.getAddressRepository();
    await addressRepository.setPlanetRepository(this._planetRepository.address);

    return this._planetRepository;
  }

  async getStarshipRepository(): Promise<StarshipRepository> {
    if (this._starshipRepository) return this._starshipRepository;
    if (this._show) console.log("Deploying starshipRepository");

    const startshipRepositoryArtifact = (await ethers.getContractFactory(
      "StarshipRepository"
    )) as StarshipRepository__factory;

    const addressRepository = await this.getAddressRepository();
    // Load Planet repository
    await this.getPlanetRepository();

    this._starshipRepository = (await startshipRepositoryArtifact.deploy(
      addressRepository.address,
      {
        gasLimit: 3000000, // hardhat incorrectly estimates gas for this contract
      }
    )) as StarshipRepository;
    await this._starshipRepository.deployed();

    await addressRepository.setStarshipRepository(
      this._starshipRepository.address
    );
    return this._starshipRepository;
  }

  async addPlanet(name: string, x: number, y: number): Promise<Planet> {
    const planetArtifact = (await ethers.getContractFactory(
      "Planet"
    )) as Planet__factory;

    const addressRepository = await this.getAddressRepository();
    await this.getStarshipRepository();

    if (this._show) console.log("Deploying planet ", name);
    const planet = (await planetArtifact.deploy(
      addressRepository.address,
      name,
      x,
      y
    )) as Planet;
    await planet.deployed();

    const planetRepository = await this.getPlanetRepository();
    await planetRepository.addPlanet(planet.address);

    return planet;
  }

  async getGoldToken(): Promise<ResourceToken> {
    if (this._goldToken !== undefined) return this._goldToken;

    if (this._show) console.log("Deploying goldToken");
    this._goldToken = await this._deployResourceToken("ST-GOLD", "STGLD");
    const addressRepository = await this.getAddressRepository();
    await addressRepository.setGoldToken(this._goldToken.address);
    return this._goldToken;
  }

  async getIronToken(): Promise<ResourceToken> {
    if (this._ironToken !== undefined) return this._ironToken;

    if (this._show) console.log("Deploying ironToken");
    this._ironToken = await this._deployResourceToken("ST-IRON", "STIRN");
    const addressRepository = await this.getAddressRepository();
    await addressRepository.setIronToken(this._ironToken.address);
    return this._ironToken;
  }

  async getOilToken(): Promise<ResourceToken> {
    if (this._oilToken !== undefined) return this._oilToken;
    if (this._show) console.log("Deploying oilToken");
    this._oilToken = await this._deployResourceToken("ST-FUEL", "STFUL");
    const addressRepository = await this.getAddressRepository();
    await addressRepository.setOilToken(this._oilToken.address);
    return this._oilToken;
  }

  async getTokenPair(
    planet: string,
    token1: string,
    token2: string
  ): Promise<ResourcePair> {
    const resourcePairArtifact = (await ethers.getContractFactory(
      "ResourcePair"
    )) as ResourcePair__factory;

    if (this._show) console.log("Deploying tokenPair");
    const pair = await resourcePairArtifact.deploy(planet, token1, token2);
    await pair.deployed();
    return pair;
  }

  async registerUser(address: string) {
    const starshipRepository = await this.getStarshipRepository();
    await this.addTestStarshipLevel();
    await starshipRepository.registerAccount(address);
  }

  async addTestStarshipLevel() {
    const startshipRepository = await this.getStarshipRepository();
    const levelsLength = await startshipRepository.getLevelsLength();
    if (levelsLength === 0) {
      await startshipRepository.addStarshipLevel(100, 100, 100, 100, 100, {
        gasLimit: 3000000, // hardhat incorrectly estimates gas for this contract
      });
    }
  }

  async getGame(
    initGold: BigNumberish,
    initIron: BigNumberish,
    initOil: BigNumberish
  ): Promise<SpaceTradersGame> {
    const addressRepository = await this.getAddressRepository();
    const planetRepository = await this.getPlanetRepository();
    const starshipRepository = await this.getStarshipRepository();
    const goldToken = await this.getGoldToken();
    const ironToken = await this.getIronToken();
    const oilToken = await this.getOilToken();

    const gameArtifact = (await ethers.getContractFactory(
      "SpaceTradersGame"
    )) as SpaceTradersGame__factory;

    if (this._show) console.log("Deploying Game...");
    const game = (await gameArtifact.deploy()) as SpaceTradersGame;
    await game.deployed();
    await game.init(addressRepository.address, initGold, initIron, initOil);

    //
    console.log("Transferring ownership to Game...");
    await goldToken.transferOwnership(game.address);
    await ironToken.transferOwnership(game.address);
    await oilToken.transferOwnership(game.address);

    await planetRepository.transferOwnership(game.address);
    await starshipRepository.transferOwnership(game.address);
    await addressRepository.setGameService(game.address);

    return game;
  }

  private async _deployResourceToken(
    name: string,
    symbol: string
  ): Promise<ResourceToken> {
    const resourceTokenArtifact = (await ethers.getContractFactory(
      "ResourceToken"
    )) as ResourceToken__factory;
    const addressRepository = await this.getAddressRepository();

    // Needed for token
    await this.getPlanetRepository();

    const token = (await resourceTokenArtifact.deploy(
      addressRepository.address,
      name,
      symbol
    )) as ResourceToken;
    await token.deployed();
    return token;
  }
}
