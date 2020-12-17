import { priceToNumber } from "./helper";
import { waffle, ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

import { AddressRepository } from "../types/ethers-v5/AddressRepository";
import { PlanetRepository } from "../types/ethers-v5/PlanetRepository";
import { Planet } from "../types/ethers-v5/Planet";
import { Planet__factory } from "../types/ethers-v5/factories/Planet__factory";
import { ResourceToken } from "./../types/ethers-v5/ResourceToken";
import { BigNumber } from "@ethersproject/bignumber";
import { Deployer } from "../scripts/deployer";
import { E18, maxAddress, minAddress, UINT256_MAX } from "./helper";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("Planet", function () {
  let deployer: Deployer;
  let planet: Planet;
  let goldToken: ResourceToken;
  let ironToken: ResourceToken;
  let userAccount: SignerWithAddress;

  beforeEach(async () => {
    deployer = new Deployer();
    planet = await deployer.addPlanet("Earth", 1, 1);

    goldToken = await deployer.getGoldToken();
    ironToken = await deployer.getIronToken();
    userAccount = (await ethers.getSigners())[1];

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

  it("should provide liquidity correctly", async () => {
   expect(await planet.getResourceLiquidity(goldToken.address)).to.be.equal(BigNumber.from(1).mul(E18));
   expect(await planet.getResourceLiquidity(ironToken.address)).to.be.equal(BigNumber.from(100).mul(E18));
  });

  //
  // ==================== SWAP =====================
  //
  it("should swap corretly gold => iron", async () => {
    await planet.addResourcePair(goldToken.address, ironToken.address);
    await deployer.registerUser(userAccount.address);
    await goldToken.mintTo(userAccount.address, BigNumber.from(1).mul(E18));
    await goldToken
      .connect(userAccount)
      .increaseAllowance(planet.address, UINT256_MAX);

    // Check initial expect price
    expect(
      priceToNumber(
        await planet.getResourcePrice(goldToken.address, ironToken.address)
      )
    ).to.be.equal(0.01);
    expect(
      priceToNumber(
        await planet.getResourcePrice(ironToken.address, goldToken.address)
      )
    ).to.be.equal(100);

    // Compute how much tokes should be transfer
    const ironOut = BigNumber.from(50).mul(E18);
    const goldIn = BigNumber.from(1).mul(E18).div(2);

    // Check that all events were generated correctly
    await expect(
      planet
        .connect(userAccount)
        .swap(goldToken.address, ironToken.address, 0, ironOut)
    )
      .to.emit(goldToken, "Transfer")
      .withArgs(planet.address, userAccount.address, 0)
      .to.emit(ironToken, "Transfer")
      .withArgs(planet.address, userAccount.address, ironOut)
      .to.emit(goldToken, "Transfer")
      .withArgs(userAccount.address, planet.address, goldIn)
      .to.emit(ironToken, "Transfer")
      .withArgs(userAccount.address, planet.address, 0);

    // Check that price computed correctly
    // with 1.5 Gold and 50 Iron
    // it should be 1.5/50 = 0.03 & 50/1.5 = 3.(3)
    expect(
      priceToNumber(
        await planet.getResourcePrice(goldToken.address, ironToken.address)
      )
    ).to.be.equal(0.03);

    expect(
      priceToNumber(
        await planet.getResourcePrice(ironToken.address, goldToken.address)
      )
    ).to.be.equal(33.3333);
  });

  it("should swap corretly iron => gold", async () => {
    await planet.addResourcePair(ironToken.address, goldToken.address);
    await deployer.registerUser(userAccount.address);
    await ironToken.mintTo(userAccount.address, BigNumber.from(100).mul(E18));
    await ironToken
      .connect(userAccount)
      .increaseAllowance(planet.address, UINT256_MAX);

    // Check initial expect price
    expect(
      priceToNumber(
        await planet.getResourcePrice(goldToken.address, ironToken.address)
      )
    ).to.be.equal(0.01);
    expect(
      priceToNumber(
        await planet.getResourcePrice(ironToken.address, goldToken.address)
      )
    ).to.be.equal(100);

    // Compute how much tokes should be transfer
    const goldOut = BigNumber.from(1).mul(E18).div(2);
    const ironIn = BigNumber.from(50).mul(E18);

    // Check that all events were generated correctly
    await expect(
      planet
        .connect(userAccount)
        .swap(goldToken.address, ironToken.address, goldOut, 0)
    )
      .to.emit(goldToken, "Transfer")
      .withArgs(planet.address, userAccount.address, goldOut)
      .to.emit(ironToken, "Transfer")
      .withArgs(planet.address, userAccount.address, 0)
      .to.emit(ironToken, "Transfer")
      .withArgs(userAccount.address, planet.address, ironIn)
      .to.emit(goldToken, "Transfer")
      .withArgs(userAccount.address, planet.address, 0);

    // Checking balances after swap  
    expect(await planet.getResourceLiquidity(goldToken.address)).to.be.equal(BigNumber.from(1).mul(E18).div(2));
    expect(await planet.getResourceLiquidity(ironToken.address)).to.be.equal(BigNumber.from(150).mul(E18));
    expect(await goldToken.balanceOf(userAccount.address)).to.be.equal(goldOut);
    expect(await ironToken.balanceOf(userAccount.address)).to.be.equal(BigNumber.from(50).mul(E18));
    // Check that price computed correctly
    // with 0.5 Gold and 150 Iron
    // it should be 0.5/150 = 0.0033 & 150/0.5 = 300
    expect(
      priceToNumber(
        await planet.getResourcePrice(goldToken.address, ironToken.address)
      )
    ).to.be.equal(0.0033);

    expect(
      priceToNumber(
        await planet.getResourcePrice(ironToken.address, goldToken.address)
      )
    ).to.be.equal(300);
  });
});
