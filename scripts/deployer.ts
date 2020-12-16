import { waffle, ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
const { deployContract } = waffle;

import BigNumber from "bignumber.js";

import { AddressRepository } from "../types/ethers-v5/AddressRepository";
import { AddressRepository__factory } from "../types/ethers-v5/factories/AddressRepository__factory";

import { PlanetRepository } from "../types/ethers-v5/PlanetRepository";
import { PlanetRepository__factory } from "../types/ethers-v5/factories/PlanetRepository__factory";

import { Planet } from "../types/ethers-v5/Planet";
import { Planet__factory } from "../types/ethers-v5/factories/Planet__factory";
import { StarshipRepository__factory } from "../types/ethers-v5/factories/StarshipRepository__factory";
import { StarshipRepository } from "../types/ethers-v5/StarshipRepository";

export class Deployer {
  private _addressRepository: AddressRepository | undefined;
  private _planetRepository: PlanetRepository | undefined;
  private _starshipRepository: StarshipRepository | undefined;

  async getAddressRepository(): Promise<AddressRepository> {
    if (this._addressRepository) return this._addressRepository;
    const addressRepositoryArtifact = (await ethers.getContractFactory(
      "AddressRepository"
    )) as AddressRepository__factory;
    this._addressRepository = (await addressRepositoryArtifact.deploy()) as AddressRepository;
    await this._addressRepository.deployed();
    return this._addressRepository;
  }

  async getPlanetRepository(): Promise<PlanetRepository> {
    if (this._planetRepository !== undefined) return this._planetRepository;

    const planetRepositoryArtifact = (await ethers.getContractFactory(
      "PlanetRepository"
    )) as PlanetRepository__factory;

    this._planetRepository = (await planetRepositoryArtifact.deploy()) as PlanetRepository;
    await this._planetRepository.deployed();

    // Add PlanetRepository to AddressRepository
    const addressRepository = await this.getAddressRepository();
    await addressRepository.setPlanetRepository(this._planetRepository.address);

    return this._planetRepository;
  }

  async getStarshipRepository(): Promise<StarshipRepository> {
    if (this._starshipRepository) return this._starshipRepository;

    const startshipRepositoryArtifact = (await ethers.getContractFactory(
      "StarshipRepository"
    )) as StarshipRepository__factory;

    const addressRepository = await this.getAddressRepository();
    // Load Planet repository
    await this.getPlanetRepository();

    this._starshipRepository = (await startshipRepositoryArtifact.deploy(
      addressRepository.address
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
}
