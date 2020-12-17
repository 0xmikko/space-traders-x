import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Web3Actions } from "./index";
import Web3 from "web3";
import { REQUIRED_NETWORK } from "../../config";
import { Game } from "../../../../types/web3-v1-contracts/Game";
import { PlanetRepository } from "../../../../types/web3-v1-contracts/PlanetRepository";
import { StarshipRepository } from "../../../../types/web3-v1-contracts/StarshipRepository";
import { AddressRepository } from "../../../../types/web3-v1-contracts/AddressRepository";
import { ResourceToken } from "../../../../types/web3-v1-contracts/ResourceToken";
import { getContract } from "../../utils/getContract";

declare global {
  interface Window {
    web3: Web3;
    ethereum: any;
  }
}

const gameJson = require("../../contracts/Game.json");
const planetRepositoryJson = require("../../contracts/PlanetRepository.json");
const starshipRepositoryJson = require("../../contracts/StarshipRepository.json");
const addressRepositoryJson = require("../../contracts/AddressRepository.json");
const resourceTokenJson = require("../../contracts/ResourceToken.json");

export const connectWeb3 = (): ThunkAction<
  void,
  RootState,
  unknown,
  Web3Actions
> => async (dispatch) => {
  console.log("CW3");
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    if (networkId !== REQUIRED_NETWORK) {
      dispatch({
        type: "WEB3_FAILED",
        payload: { error: "WRONG_NETWORK_ERROR" },
      });
      return;
    }

    const game = ((await getContract(web3, gameJson)) as unknown) as Game;
    const planetRepository = ((await getContract(
      web3,
      planetRepositoryJson
    )) as unknown) as PlanetRepository;
    const starshipRepository = ((await getContract(
      web3,
      starshipRepositoryJson
    )) as unknown) as StarshipRepository;
    const addressRepository = ((await getContract(
      web3,
      addressRepositoryJson
    )) as unknown) as AddressRepository;

    const goldTokenAddress = await addressRepository.methods
      .getGoldToken()
      .call();
    const goldToken = ((await new web3.eth.Contract(
      resourceTokenJson,
      goldTokenAddress
    )) as unknown) as ResourceToken;

    const ironTokenAddress = await addressRepository.methods
      .getGoldToken()
      .call();
    const ironToken = ((await new web3.eth.Contract(
      resourceTokenJson,
      ironTokenAddress
    )) as unknown) as ResourceToken;

    const oilTokenAddress = await addressRepository.methods
      .getGoldToken()
      .call();
    const oilToken = ((await new web3.eth.Contract(
      resourceTokenJson,
      oilTokenAddress
    )) as unknown) as ResourceToken;

    dispatch({
      type: "WEB3_CONNECTED",
      payload: {
        web3,
        accounts,
        networkId,
        game,
        planetRepository,
        starshipRepository,

        goldToken,
        ironToken,
        oilToken,
      },
    });
  } else {
    dispatch({ type: "WEB3_FAILED", payload: { error: "CONNECTION_ERROR" } });
  }
};
