import { RootState } from "../index";
import { Planet } from "../../core/planet";
import {BigNumber} from "ethers";

export const planetsSelector = (state: RootState) => state.planets;

export type PlanetActions =
  | {
      type: "PLANETS_LIST";
      payload: Record<string, Planet>;
    }
  | {
      type: "PLANETS_FAILED";
    }
  | {
      type: "PLANETS_UPDATE_PRICES";
      payload: {
        address: string;
        goldOilPrice: BigNumber;
        goldIronPrice: BigNumber;
        oilIronPrice: BigNumber;
      };
    };

export interface AdditionalPlanetInfo {
  description: string;
  image: string;
}

export const additionalPlanetInfo: Record<string, AdditionalPlanetInfo> = {
  VICRION: {
    description:
      "Blue gas giant with a complex planetary system. Galactical manufacturing center with large shipyards. Despite the fact that the planet is not rich in minerals, it has the most modern production facilities for the processing of metals and gold.",
    image: "./img/vicrion.jpg",
  },
  GOCURY: {
    description:
      "A poor desert planet, a den of mercenaries, smugglers and speculators. The locals love gold, but they often try to trick inexperienced traders.",
    image: "./img/gocury.jpg",
  },
  UITANIA: {
    description:
      "A cosmopolitan urban world made up of one city from the entire planet. A large economic center, so all the richest traders from all over the galaxy come here to become even richer.",
    image: "./img/uitania.jpg",
  },
  "DION ZJ97": {
    description:
      "A mining planet that has been fought over by crime lords for its valuable Spice. A fissure vent beneath the spice mines served as a source of astatic element that could be refined into hyperfuel for starships.",
    image: "./img/dion.jpeg",
  },
  OKAO: {
    description:
      "Tropical planet used to monitor the nearby Dion ZJ97 fuel production. It is famous for its beautiful views, therefore it is a resort for production owners.",
    image: "./img/okao.jpeg",
  },
  THUBEON: {
    description:
      "An originally lush and forested planet that becomes volcanic and almost lifeless during an ancient battle. Many centuries later, it has become a center for the production of fuel and everything that burns.",
    image: "./img/thubeon.jpg",
  },
  ZUTIS: {
    description:
      "Medium mineral planet located in a remote section of the galaxy, its surface is covered with a layer of gray salt over its red-colored soil. Rich in minerals such as iron ore and aluminum. ",
    image: "./img/zutis.jpg",
  },
};
