import { BigNumber } from '@ethersproject/bignumber';

import { waffle, ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

import { AddressRepository } from "../types/ethers-v5/AddressRepository";
import { AddressRepository__factory } from "../types/ethers-v5/factories/AddressRepository__factory";

import { PlanetRepository } from "../types/ethers-v5/PlanetRepository";
import { PlanetRepository__factory } from "../types/ethers-v5/factories/PlanetRepository__factory";

import { Planet } from "../types/ethers-v5/Planet";
import { Planet__factory } from "../types/ethers-v5/factories/Planet__factory";

import { ResourcePair } from './../types/ethers-v5/ResourcePair';
import { ResourceToken } from './../types/ethers-v5/ResourceToken';

import { Deployer } from "../scripts/deployer";

const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("ResourcePair", function () {

    let deployer : Deployer;
    let goldToken : ResourceToken;
    let ironToken: ResourceToken;
    let planetAddress : string;
    let goldIronPair : ResourcePair;

    beforeEach(async () => {
        deployer = new Deployer();
        goldToken = await deployer.getGoldToken();
        ironToken = await deployer.getIronToken();

        const planet = await deployer.addPlanet("Earth", 1,1)
        planetAddress = planet.address;
        goldIronPair = await deployer.getTokenPair(planetAddress, goldToken.address, ironToken.address);


    })
        
    it("should calculate correct price", async function () {
        await goldToken.mintTo(planetAddress, BigNumber.from('1000000000000000000'));
        await ironToken.mintTo(planetAddress, BigNumber.from('10000000000000000000000'));


        console.log(await goldToken.balanceOf(planetAddress));
        console.log(await ironToken.balanceOf(planetAddress));

        console.log(await goldIronPair.getLiquidity())
        console.log(await (await goldIronPair.getResourcePrice1()).toString())
        console.log(await (await goldIronPair.getResourcePrice2()).toNumber())


    })
});