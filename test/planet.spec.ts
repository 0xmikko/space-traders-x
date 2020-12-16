import { waffle, ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

import { AddressRepository } from "../types/ethers-v5/AddressRepository";
import { PlanetRepository } from "../types/ethers-v5/PlanetRepository";
import { Planet } from "../types/ethers-v5/Planet";
import { Planet__factory } from "../types/ethers-v5/factories/Planet__factory";
import { ResourceToken } from "./../types/ethers-v5/ResourceToken";
import { BigNumber } from "@ethersproject/bignumber";
import { Deployer } from "../scripts/deployer";
import { E18, maxAddress, minAddress } from "./helper";
const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("Planet", function () {
  let deployer: Deployer;
  let planet: Planet;
  let goldToken: ResourceToken;
  let ironToken: ResourceToken;
  let userAccount: string;

  beforeEach(async () => {
    deployer = new Deployer();
    planet = await deployer.addPlanet("Earth", 1, 1);

    goldToken = await deployer.getGoldToken();
    ironToken = await deployer.getIronToken();
    userAccount = (await ethers.getSigners())[1].address;

    await goldToken.mintTo(planet.address, BigNumber.from(1).mul(E18));
    await ironToken.mintTo(planet.address, BigNumber.from(100).mul(E18));
  });

  it("should create token pair contract", async () => {
    await expect(planet.addResourcePair(goldToken.address, ironToken.address))
      .to.emit(planet, "NewResourcePair")
      .withArgs(
        minAddress(goldToken.address, ironToken.address),
        maxAddress(goldToken.address, ironToken.address)
      );

    const pair1 = await planet.getResourcePair(
      goldToken.address,
      ironToken.address
    );

    const pair2 = await planet.getResourcePair(
      ironToken.address,
      goldToken.address
    );

    expect(pair1).to.be.equal(pair2);
  });

  it("should revert for not registered user", async () => {
    await planet.addResourcePair(goldToken.address, ironToken.address);
    await expect(
      planet.swap(goldToken.address, ironToken.address, 10, 100)
    ).to.be.revertedWith("Allowed only for users on planet");
  });
});
