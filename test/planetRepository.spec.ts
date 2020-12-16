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

const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("PlanetRepository", function () {
  let addressRepository: AddressRepository;
  let planetRepository: PlanetRepository;
  let planet1: Planet;

  let addressRepositoryArtifact: AddressRepository__factory;
  let planetRepositoryArtifact: PlanetRepository__factory;
  let planetArtifact: Planet__factory;

  before(async function () {
    addressRepositoryArtifact = (await ethers.getContractFactory(
      "AddressRepository"
    )) as AddressRepository__factory;

    planetRepositoryArtifact = (await ethers.getContractFactory(
      "PlanetRepository"
    )) as PlanetRepository__factory;

    planetArtifact = (await ethers.getContractFactory(
      "Planet"
    )) as Planet__factory;
  });

  beforeEach(async function () {
    addressRepository = (await addressRepositoryArtifact.deploy()) as AddressRepository;

    planetRepository = (await planetRepositoryArtifact.deploy()) as PlanetRepository;
    planetRepository.deployed();

    await addressRepository.setPlanetRepository(planetRepository.address);
    planet1 = (await planetArtifact.deploy(
      addressRepository.address,
      "Earth",
      1,
      2
    )) as Planet;
  });

  it("addPlanet(address) test", async function () {
    await expect(planetRepository.addPlanet(planet1.address))
      .to.emit(planetRepository, "NewPlanetAdded")
      .withArgs(planet1.address);
    expect(await planetRepository.getPlanetsLength()).to.be.equal(1);
  });

  it("getPlanetName(0) test", async function () {
    await planetRepository.addPlanet(planet1.address);
    expect(await planetRepository.getPlanetName(0)).to.equal("Earth");
  });

  it("getCoord(0) test", async function () {
    await planetRepository.addPlanet(planet1.address);
    const [x, y] = await planetRepository.getPlanetCoord(0);
    expect(x).to.be.equal(1);
    expect(y).to.be.equal(2);
  });

  it("getPlanetByIndex(0) test", async function () {
    await planetRepository.addPlanet(planet1.address);
    expect(await planetRepository.getPlanetByIndex(0)).to.be.equal(
      planet1.address
    );
  });

  it("calculate distance for the same location", async function () {
    await planetRepository.addPlanet(planet1.address);
    const planet2 = (await planetArtifact.deploy(
      addressRepository.address,
      "Mars",
      1,
      2
    )) as Planet;

    await planetRepository.addPlanet(planet2.address);
    expect(
      await planetRepository.calculateDistance(planet1.address, planet2.address)
    ).to.be.equal(0);
  });

  it("calculate distance for planet with bigger coord", async function () {
    await planetRepository.addPlanet(planet1.address);
    const planet2 = (await planetArtifact.deploy(
      addressRepository.address,
      "Mars",
      3,
      6
    )) as Planet;

    await planetRepository.addPlanet(planet2.address);
    expect(
      await planetRepository.calculateDistance(planet1.address, planet2.address)
    ).to.be.equal(6);
  });

  it("calculate distance for planet with lesser coord", async function () {
    await planetRepository.addPlanet(planet1.address);
    const planet2 = (await planetArtifact.deploy(
      addressRepository.address,
      "Mars",
      0,
      0
    )) as Planet;

    await planetRepository.addPlanet(planet2.address);
    expect(
      await planetRepository.calculateDistance(planet1.address, planet2.address)
    ).to.be.equal(3);
  });

});
