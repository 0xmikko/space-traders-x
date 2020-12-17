/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

// @ts-ignore
import { ethers } from "hardhat";
import { Deployer } from "./deployer";
import { planetsList } from "./planetsList";
import { starShipLevels } from "./levels";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { E18 } from "../test/helper";

export async function finalDeploy() {
  const initGold = "1000";
  const initIron = "0";
  const initOil = "0";

  const account = (await ethers.getSigners())[0] as SignerWithAddress;
  console.log("Deploy by: ", account.address);
  console.log(
    "Money on account",
    (await account.getBalance()).mul(100).div(E18).toNumber() / 100
  );

  const deployer = new Deployer(true);
  const game = await deployer.getGame(initGold, initIron, initOil);
  // Adds planets

  for (let p of planetsList) {
    console.log("Adding planet", p.name);
    await game.addPlanet(
      p.name,
      p.x,
      p.y,
      p.initGold,
      p.generatesGold,
      p.initIron,
      p.generatesIron,
      p.initOil,
      p.generatesOil,
      {
        gasLimit: 8000000, // hardhat incorrectly estimates gas for this contract
      }
    );
  }

  for (let level of starShipLevels) {
    console.log("Adding level", level.velocity);
    await game.addStarshipLevel(
      level.velocity,
      level.fuelPerParsec,
      level.gold,
      level.iron,
      level.oil
    );
  }

  const addressRepository = await deployer.getAddressRepository();
  console.log("Successfully deployed at: ", addressRepository.address);
}

finalDeploy()
  .then(() => {
    console.log("Ok");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
