import { waffle, ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

import BigNumber from "bignumber.js";

import { StarshipRepository } from "../types/ethers-v5/StarshipRepository";

import {Deployer} from "../scripts/deployer";

const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("StarshipRepository", function () {
  let starshipRepository: StarshipRepository;
  let userAccount : string;
  let deployer : Deployer;
  

  beforeEach(async function () {
    deployer = new Deployer();
    starshipRepository = await deployer.getStarshipRepository();
    await deployer.addPlanet("Earth", 1,1);
    userAccount = (await ethers.getSigners())[0].address;
  });

  it("isAccountExists", async function () {
  
    expect(await starshipRepository.isAccountExists(userAccount)).to.be.equal(false);
  });

  it("registerAccount", async function () {
    
    await expect(starshipRepository.registerAccount(userAccount))
    .to.emit(starshipRepository, "NewStarShip")
    .withArgs(userAccount);

    expect(await starshipRepository.isAccountExists(userAccount)).to.be.equal(true);
  });

 
});
