import {Planet as PlanetContract} from "../../../types/ethers-v5/Planet";
import {BigNumber} from "ethers";

export interface Planet {
    address: string,
    name: string,
    x: number,
    y: number,
    description: string,
    image: string,
    goldOilPrice?: BigNumber,
    goldIronPrice?: BigNumber,
    ironOilPrice?: BigNumber,
    contract?: PlanetContract,

}
