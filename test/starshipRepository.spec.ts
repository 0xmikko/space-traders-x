import { waffle, ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

import BigNumber from "bignumber.js";

import { StarshipRepository } from "../types/ethers-v5/StarshipRepository";

import { Deployer } from "../scripts/deployer";

const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("StarshipRepository", function () {
  let starshipRepository: StarshipRepository;
  let userAccount: string;
  let deployer: Deployer;
  let planet0address: string;

  beforeEach(async function () {
    deployer = new Deployer();
    starshipRepository = await deployer.getStarshipRepository();
    planet0address = (await deployer.addPlanet("Earth", 1, 1)).address;
    userAccount = (await ethers.getSigners())[1].address;
  });

  it("isAccountExists", async function () {
    expect(await starshipRepository.isAccountExists(userAccount)).to.be.equal(
      false
    );
  });

  it("should add Starship level", async function () {
    await starshipRepository.addStarshipLevel(100, 100, 100, 100, 100);
    expect(await starshipRepository.getLevelsLength()).to.be.equal(1);
  });

  it("should revert if no starship levels were setup", async function () {
    await expect(
      starshipRepository.registerAccount(userAccount)
    ).to.be.revertedWith("No startship levels set up");
  });

  it("should registerAccount", async function () {
    await starshipRepository.addStarshipLevel(100, 100, 100, 100, 100);
    await expect(starshipRepository.registerAccount(userAccount))
      .to.emit(starshipRepository, "NewStarShip")
      .withArgs(userAccount);

    expect(await starshipRepository.isAccountExists(userAccount)).to.be.equal(
      true
    );
  });

  it("should revert if try to register account twice", async function () {
    await starshipRepository.addStarshipLevel(100, 100, 100, 100, 100);
    await expect(starshipRepository.registerAccount(userAccount));
    await expect(
      starshipRepository.registerAccount(userAccount)
    ).to.be.revertedWith("Account is already exists");
  });

  it("should return getAccountPlanet(account) correctly ", async function () {
    await starshipRepository.addStarshipLevel(100, 100, 100, 100, 100);
    await expect(starshipRepository.registerAccount(userAccount));
    expect(await starshipRepository.getAccountPlanet(userAccount)).to.be.equal(
      planet0address
    );
  });

  it("should return getAccountStartshipProperties(account) correctly ", async function () {
    await starshipRepository.addStarshipLevel(10, 100, 100, 100, 100);
    await expect(starshipRepository.registerAccount(userAccount));
    const [
      level,
      velocity,
      fuel,
    ] = await starshipRepository.getAccountStartshipProperties(userAccount);
    expect(level).to.be.equal(0);
    expect(velocity).to.be.equal(10);
    expect(fuel).to.be.equal(100);
  });

  it("should return calculateFuelConsumption(account) correctly ", async function () {
    await starshipRepository.addStarshipLevel(100, 10, 100, 100, 100);
    await expect(starshipRepository.registerAccount(userAccount));
    expect(
      await starshipRepository.calculateFuelConsumption(userAccount, 100)
    ).to.be.equal(10);
    expect(
      await starshipRepository.calculateFuelConsumption(userAccount, 1000)
    ).to.be.equal(100);
  });

  it("should return calculateTimeToArrive(account) correctly ", async function () {
    await starshipRepository.addStarshipLevel(100, 1, 100, 100, 100);
    await expect(starshipRepository.registerAccount(userAccount));
    expect(
      await starshipRepository.calculateTimeToArrive(userAccount, 100)
    ).to.be.equal(2);
    expect(
      await starshipRepository.calculateTimeToArrive(userAccount, 1000)
    ).to.be.equal(11);
  });

  it("should generate Move event when moveToPlanet(address, address) was called", async function () {
    const marsAddress = (await deployer.addPlanet("Mars", 1000, 1000)).address;
    await starshipRepository.addStarshipLevel(100, 100, 100, 100, 100);
    await starshipRepository.registerAccount(userAccount);
    await expect(starshipRepository.moveToPlanet(userAccount, marsAddress))
      .to.emit(starshipRepository, "Move")
      .withArgs(userAccount, planet0address, marsAddress);
  });

  it("should calculate fuel & update timeToArrive correctly when moveToPlanet(address, address) was called", async function () {
    const marsAddress = (await deployer.addPlanet("Mars", 1000, 1000)).address;
    await starshipRepository.addStarshipLevel(100, 100, 100, 100, 100);
    await starshipRepository.registerAccount(userAccount);
    await starshipRepository.moveToPlanet(userAccount, marsAddress);
    // time = 1 + (1000 -1 + 1000 -1)/100 = 1 + 1998/100 = 20
    expect(await starshipRepository.timeToArrive(userAccount)).to.be.equal(20);
    expect(await starshipRepository.getAccountPlanet(userAccount)).to.be.equal(marsAddress);
  });

  it("should revert if move was called during moving", async function () {
    const marsAddress = (await deployer.addPlanet("Mars", 1000, 1000)).address;
    await starshipRepository.addStarshipLevel(100, 100, 100, 100, 100);
    await starshipRepository.registerAccount(userAccount);
    await starshipRepository.moveToPlanet(userAccount, marsAddress);
    await expect(starshipRepository.moveToPlanet(userAccount, marsAddress))
    .to.be.revertedWith("Starship is on the way")
  });

});
