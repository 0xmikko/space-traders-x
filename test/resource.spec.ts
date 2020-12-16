import { waffle, ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
const { deployContract } = waffle;

import { AddressRepository } from "../types/ethers-v5/AddressRepository";
import { AddressRepository__factory } from "../types/ethers-v5/factories/AddressRepository__factory";

import { PlanetRepository } from "../types/ethers-v5/PlanetRepository";
import { PlanetRepository__factory } from "../types/ethers-v5/factories/PlanetRepository__factory";

import { Planet } from "../types/ethers-v5/Planet";
import { Planet__factory } from "../types/ethers-v5/factories/Planet__factory";

import { Deployer } from "../scripts/deployer";

const chai = require("chai");

chai.use(solidity);
const { expect } = chai;

describe("ResourceToken", function () {
    beforeEach(async function () {
        
    })

    
});