import { Signer } from "ethers";
import { waffle, ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
const { deployContract } = waffle;

import { AddressRepository } from "../types/ethers-v5/AddressRepository";
import { AddressRepository__factory } from "../types/ethers-v5/factories/AddressRepository__factory";

import { PlanetRepository } from "../types/ethers-v5/PlanetRepository";
import { PlanetRepository__factory } from "../types/ethers-v5/factories/PlanetRepository__factory";

import { Planet } from "../types/ethers-v5/Planet";
import { Planet__factory } from "../types/ethers-v5/factories/Planet__factory";

import { ResourceToken } from "./../types/ethers-v5/ResourceToken";
import { Deployer } from "../scripts/deployer";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { advanceBlockAtTime } from "./helper";

const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("ResourceToken", function () {
  let deployer: Deployer;
  let planet: Planet;
  let oilToken: ResourceToken;
  let userAccount: SignerWithAddress;

  beforeEach(async function () {
    deployer = new Deployer();
    planet = await deployer.addPlanet("Earth", 1, 1);
    oilToken = await deployer.getOilToken();
    userAccount = (await ethers.getSigners())[1];
  });

  it("should addPlanet(address planet,uint256 initValue, uitn256 generates) correctly", async () => {
    await expect(oilToken.addPlanet(planet.address, 10000, 10)).to.be.emit(
      oilToken,
      "NewPlanetAdded",
      1000,
      10
    );

    expect(await oilToken.totalSupply()).to.be.equal(10000);
  });

  it("should update all params at mint correctly", async () => {
    const tx = await oilToken.addPlanet(planet.address, 10000, 0);

    await oilToken.mintTo(userAccount.address, 100);
    expect(await oilToken.totalSupply()).to.be.equal(10100);
    expect(await oilToken.totalMinted()).to.be.equal(100);
  });

  it("should update all params at burned correctly", async () => {
    const tx = await oilToken.addPlanet(planet.address, 10000, 0);

    await oilToken.mintTo(userAccount.address, 100);
    await oilToken.burn(userAccount.address, 100);
    expect(await oilToken.totalSupply()).to.be.equal(10000);
    expect(await oilToken.totalMinted()).to.be.equal(100);
    expect(await oilToken.totalBurned()).to.be.equal(100);
  });

  it("calculates planet balance correctly", async () => {
    const generatePerBlock = 100;
    const initValue = 10000;
    const { blockNumber } = await oilToken.addPlanet(
      planet.address,
      initValue,
      generatePerBlock
    );

    const tx2 = await oilToken.mintTo(userAccount.address, 100);
    const blockDif = tx2.blockNumber - blockNumber;

    expect(blockDif).to.be.at.least(1);
    expect(await oilToken.balanceOf(planet.address)).to.be.equal(
      initValue + generatePerBlock * blockDif
    );
  });

  it("calculates planet balance  after transfer user => planet correctly", async () => {
    const generatePerBlock = 100;
    const initValue = 10000;
    const { blockNumber } = await oilToken.addPlanet(
      planet.address,
      initValue,
      generatePerBlock
    );

    await oilToken.mintTo(userAccount.address, 199990);
    const tx2 = await oilToken
      .connect(userAccount)
      .transfer(planet.address, 199990);
    const blockDif = tx2.blockNumber - blockNumber;

    expect(blockDif).to.be.at.least(1);
    expect(await oilToken.balanceOf(planet.address)).to.be.equal(
      initValue + generatePerBlock * blockDif + 199990
    );
  });

  it("calculates planet balance  after transfer planet => user correctly", async () => {
    const generatePerBlock = 100;
    const initValue = 10000;

    const fakePlanetAddress = (await ethers.getSigners())[2];
    const { blockNumber } = await oilToken.addPlanet(
      fakePlanetAddress.address,
      initValue,
      generatePerBlock
    );

    await oilToken.mintTo(userAccount.address, 199990);

    const tx2 = await oilToken
      .connect(fakePlanetAddress)
      .transfer(userAccount.address, initValue);
    const blockDif = tx2.blockNumber - blockNumber;

    expect(blockDif).to.be.at.least(1);
    expect(await oilToken.balanceOf(fakePlanetAddress.address)).to.be.equal(
      generatePerBlock * blockDif
    );
  });

  it("should generates tokens correctly", async () => {
    const generatePerBlock = 180;
    const tx1 = await oilToken.addPlanet(
      planet.address,
      10000,
      generatePerBlock
    );

    // Some tx's to generate new blocks
    await oilToken.mintTo(userAccount.address, 100);
    const tx2 = await oilToken.burn(userAccount.address, 100);

    const blockDif = tx2.blockNumber - tx1.blockNumber;
    expect(blockDif).to.be.at.least(1);

    expect(await oilToken.totalSupply()).to.be.equal(
      10000 + blockDif * generatePerBlock
    );
  });

  it("should generates tokens correctly when new plannet added", async () => {
    const generatePerBlock = 180;

    const tx1 = await oilToken.addPlanet(
      planet.address,
      10000,
      generatePerBlock
    );

    // Some tx's to generate new blocks
    await oilToken.mintTo(userAccount.address, 0);
    await oilToken.burn(userAccount.address, 0);

    // ADDING NEW PLANET
    const planet2 = await deployer.addPlanet("Mars", 23, 20);
    const generatePerBlock2 = 250;
    const tx3 = await oilToken.addPlanet(planet2.address, 0, generatePerBlock2);

    const blockDif = tx3.blockNumber - tx1.blockNumber;
    expect(blockDif).to.be.at.least(1);

    const intermediateSupply = blockDif * generatePerBlock;
    expect(await oilToken.totalSupply()).to.be.equal(
      10000 + intermediateSupply
    );

    // Check generation rate
    expect(await oilToken.getCurrentGeneratePerBlock()).to.be.equal(
      generatePerBlock + generatePerBlock2
    );

    // Some tx's to generate new blocks
    await oilToken.mintTo(userAccount.address, 0);
    const tx4 = await oilToken.burn(userAccount.address, 0);

    const blockDif2 = tx4.blockNumber - tx3.blockNumber;
    expect(blockDif2).to.be.at.least(1);

    expect(await oilToken.totalSupply()).to.be.equal(
      10000 +
        intermediateSupply +
        blockDif2 * (generatePerBlock + generatePerBlock2)
    );
  });
});
