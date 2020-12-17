/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import { Deployer } from "./deployer";
import { planetsList } from "./planetsList";
import { starShipLevels } from "./levels";

export async function finalDeploy() {
  const initGold = "1000";
  const initIron = "0";
  const initOil = "0";

  const deployer = new Deployer();
  const game = await deployer.getGame(initGold, initIron, initOil);

  // Adds planets
  planetsList.map(async (p) => {
    await game.addPlanet(
      p.name,
      p.x,
      p.y,
      p.initGold,
      p.generatesGold,
      p.initIron,
      p.generatesIron,
      p.initOil,
      p.generatesOil
    );

    starShipLevels.map(async (level) => {
      await game.addStarshipLevel(
        level.velocity,
        level.fuelPerParsec,
        level.gold,
        level.iron,
        level.oil
      );
    });
  });
}

finalDeploy().then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
