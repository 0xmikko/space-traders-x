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


  
});
