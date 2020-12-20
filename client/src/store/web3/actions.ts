import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Web3Actions } from "./index";
import { ADDRESS_REPOSITORY, REQUIRED_NETWORK } from "../../config";
import { SpaceTradersGame } from "../../../../types/ethers-v5/SpaceTradersGame";
import { PlanetRepository } from "../../../../types/ethers-v5/PlanetRepository";
import { StarshipRepository } from "../../../../types/ethers-v5/StarshipRepository";
import { AddressRepository } from "../../../../types/ethers-v5/AddressRepository";
import { ResourceToken } from "../../../../types/ethers-v5/ResourceToken";
import { getPlanetsList } from "../planets/actions";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const gameJson = require("../../contracts/core/Game.sol/SpaceTradersGame.json");
const planetRepositoryJson = require("../../contracts/repository/PlanetRepository.sol/PlanetRepository.json");
const starshipRepositoryJson = require("../../contracts/repository/StarshipRepository.sol/StarshipRepository.json");
const addressRepositoryJson = require("../../contracts/repository/AddressRepository.sol/AddressRepository.json");
const resourceTokenJson = require("../../contracts/tokens/Resource.sol/ResourceToken.json");

export const connectWeb3 = (): ThunkAction<
  void,
  RootState,
  unknown,
  Web3Actions
> => async (dispatch) => {
  if (window.ethereum) {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const networkId = await provider.detectNetwork();

    if (networkId.chainId !== REQUIRED_NETWORK) {
      dispatch({
        type: "WEB3_FAILED",
        payload: { error: "WRONG_NETWORK_ERROR" },
      });
      return;
    }

    const addressRepository = (await ethers.ContractFactory.getContract(
      ADDRESS_REPOSITORY,
      addressRepositoryJson.abi,
      signer
    )) as AddressRepository;

    const gameAddress = await addressRepository.getGameService();
    const game = (await ethers.ContractFactory.getContract(
      gameAddress,
      gameJson.abi,
      signer
    )) as SpaceTradersGame;

    const planetRepositoryAddress = await addressRepository.getPlanetRepository();

    const planetRepository = (await ethers.ContractFactory.getContract(
      planetRepositoryAddress,
      planetRepositoryJson.abi,
      signer
    )) as PlanetRepository;

    const starshipRepositoryAddress = await addressRepository.getStarshipRepository();
    const starshipRepository = (await ethers.ContractFactory.getContract(
      starshipRepositoryAddress,
      starshipRepositoryJson.abi,
      signer
    )) as StarshipRepository;

    const goldTokenAddress = await addressRepository.getGoldToken();
    const goldToken = (await ethers.ContractFactory.getContract(
      goldTokenAddress,
      resourceTokenJson.abi,
      signer
    )) as ResourceToken;

    const ironTokenAddress = await addressRepository.getIronToken();
    const ironToken = (await ethers.ContractFactory.getContract(
      ironTokenAddress,
      resourceTokenJson.abi,
      signer
    )) as ResourceToken;

    const oilTokenAddress = await addressRepository.getOilToken();
    const oilToken = (await ethers.ContractFactory.getContract(
      oilTokenAddress,
      resourceTokenJson.abi,
      signer
    )) as ResourceToken;

    await dispatch({
      type: "WEB3_CONNECTED",
      payload: {
        account: await signer.getAddress(),
        signer,
        networkId: networkId.chainId,
        game,
        planetRepository,
        starshipRepository,

        goldToken,
        ironToken,
        oilToken,

        goldTokenAddress,
        ironTokenAddress,
        oilTokenAddress,
      },
    });
    dispatch(getPlanetsList());
  } else {
    dispatch({ type: "WEB3_FAILED", payload: { error: "CONNECTION_ERROR" } });
  }
};
