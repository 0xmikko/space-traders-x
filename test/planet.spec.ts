import { priceToNumber } from "./../.history/test/helper_20201217095015";
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

  //
  // ==================== SWAP =====================
  //
  it("should calculate correct price after swap", async () => {
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
});
