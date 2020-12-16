import { waffle, ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

import { AddressRepository } from "../types/ethers-v5/AddressRepository";
import { PlanetRepository } from "../types/ethers-v5/PlanetRepository";
import { Planet } from "../types/ethers-v5/Planet";
import { Planet__factory } from "../types/ethers-v5/factories/Planet__factory";

import { Deployer } from "../scripts/deployer";

const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("PlanetRepository", function () {
  let addressRepository: AddressRepository;
  let planetRepository: PlanetRepository;
  let planet1: Planet;
  let deployer: Deployer;

  let planetArtifact: Planet__factory;

  beforeEach(async function () {
    deployer = new Deployer();
    planetArtifact = (await ethers.getContractFactory(
        "Planet"
      )) as Planet__factory;
    addressRepository = await deployer.getAddressRepository();
    planetRepository = await deployer.getPlanetRepository();
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
    const planet2 = await deployer.addPlanet("Mars", 1, 2);

    expect(
      await planetRepository.calculateDistance(planet1.address, planet2.address)
    ).to.be.equal(0);
  });

  it("calculate distance for planet with bigger coord", async function () {
    await planetRepository.addPlanet(planet1.address);
    const planet2 = await deployer.addPlanet("Mars", 3, 6);

    await planetRepository.addPlanet(planet2.address);
    expect(
      await planetRepository.calculateDistance(planet1.address, planet2.address)
    ).to.be.equal(6);
  });

  it("calculate distance for planet with lesser coord", async function () {
    await planetRepository.addPlanet(planet1.address);
    const planet2 = await deployer.addPlanet("Mars", 0, 0);

    await planetRepository.addPlanet(planet2.address);
    expect(
      await planetRepository.calculateDistance(planet1.address, planet2.address)
    ).to.be.equal(3);
  });

  it("revert if planet doesn't", async function () {
    await planetRepository.addPlanet(planet1.address);
    const planet2FakeAddress = "0x279f6CEFEeAD43544e597B4c5Bd1D327D6D5ED1A";
    await expect(
      planetRepository.calculateDistance(planet1.address, planet2FakeAddress)
    ).to.be.revertedWith("Planet doesn't exists");

    await expect(
      planetRepository.calculateDistance(planet2FakeAddress, planet1.address)
    ).to.be.revertedWith("Planet doesn't exists");
  });
});
