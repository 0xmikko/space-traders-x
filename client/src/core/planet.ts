import {Planet as PlanetContract} from "../../../types/web3-v1-contracts/Planet";

export interface Planet {
    address: string,
    name: string,
    x: number,
    y: number,
    description: string,
    image: string,
    goldOilPrice?: number,
    goldIronPrice?: number,
    ironOilPrice?: number,
    contract?: PlanetContract,

}
