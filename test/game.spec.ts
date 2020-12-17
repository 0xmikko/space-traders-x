import {Deployer} from "../scripts/deployer";
import {ethers} from "hardhat";
import {solidity} from "ethereum-waffle";

import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {SpaceTradersGame} from "../types/ethers-v5/SpaceTradersGame";
import {ResourceToken} from "../types/ethers-v5/ResourceToken";

const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("SpaceTradersGame", function () {
  let deployer: Deployer;
  let game: SpaceTradersGame;
  let userAccount: SignerWithAddress;
  let goldToken: ResourceToken;
  let ironToken: ResourceToken;
  let oilToken: ResourceToken;

  beforeEach(async () => {
    deployer = new Deployer();
    game = await deployer.getGame("1000", "0", "0");
    userAccount = (await ethers.getSigners())[1];

    goldToken = await deployer.getGoldToken();
    ironToken = await deployer.getIronToken();
    oilToken = await deployer.getOilToken();
  });

  it("should revert addPlanet & addStarshiplevel for all except owner", async () => {
    await expect(
      game.connect(userAccount).addPlanet("Earth", 1, 1, 1, 1, 1, 1, 1, 1)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      game.connect(userAccount).addStarshipLevel(1, 1, 1, 1, 1)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should add planets", async () => {
    await game.addPlanet("Earth", 1, 1, 1, 1, 1, 1, 1, 1);
    const planetRepository = await deployer.getPlanetRepository();
    expect(await planetRepository.getPlanetsLength()).to.be.equal(1);
  });

  it("should revert to make move or upgrade if user not registered", async () => {
    await game.addPlanet("Earth", 1, 1, 1, 1, 1, 1, 1, 1);
    const planetRepository = await deployer.getPlanetRepository();
    const planet = await planetRepository.getPlanetByIndex(0);
    await expect(game.connect(userAccount).move(planet)).to.be.revertedWith(
      "Game: Account is not registered"
    );
    await expect(game.connect(userAccount).upgradeShip()).to.be.revertedWith(
      "Game: Account is not registered"
    );
  });

  it("should start game for new user", async () => {
    await game.addPlanet("Earth", 1, 1, 1, 1, 1, 1, 1, 1);
    await game.addStarshipLevel(100, 100, 100, 100, 100);
    await game.connect(userAccount).startGame();
    // expect(await goldToken.balanceOf(userAccount.address)).to.be.equal()
  });

  it("should revert if player try start game twice", async () => {
    await game.addPlanet("Earth", 1, 1, 1, 1, 1, 1, 1, 1);
    await game.addStarshipLevel(100, 100, 100, 100, 100);
    await game.connect(userAccount).startGame();
    await expect(game.connect(userAccount).startGame()).to.be.revertedWith(
      "Account is already exists"
    );
    // expect(await goldToken.balanceOf(userAccount.address)).to.be.equal()
  });
});
