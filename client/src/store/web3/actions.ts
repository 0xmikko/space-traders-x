import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {Web3Actions} from "./index";
import Web3 from "web3";
import {ADDRESS_REPOSITORY, REQUIRED_NETWORK} from "../../config";
import {SpaceTradersGame} from "../../../../types/web3-v1-contracts/SpaceTradersGame";
import {PlanetRepository} from "../../../../types/web3-v1-contracts/PlanetRepository";
import {StarshipRepository} from "../../../../types/web3-v1-contracts/StarshipRepository";
import {AddressRepository} from "../../../../types/web3-v1-contracts/AddressRepository";
import {ResourceToken} from "../../../../types/web3-v1-contracts/ResourceToken";
import {getPlanetsList} from "../planets/actions";

declare global {
  interface Window {
    web3: Web3;
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

    const addressRepository = ((await new web3.eth.Contract(
      addressRepositoryJson.abi, ADDRESS_REPOSITORY
    )) as unknown) as AddressRepository;

    const gameAddress = await addressRepository.methods.getGameService().call();
    const game = ((await new web3.eth.Contract(
      gameJson.abi,
      gameAddress
    )) as unknown) as SpaceTradersGame;

    const planetRepositoryAddress = await addressRepository.methods
      .getPlanetRepository()
      .call();
    const planetRepository = ((await new web3.eth.Contract(
      planetRepositoryJson.abi,
      planetRepositoryAddress
    )) as unknown) as PlanetRepository;

    const starshipRepositoryAddress = await addressRepository.methods
      .getStarshipRepository()
      .call();
    const starshipRepository = ((await new web3.eth.Contract(
      starshipRepositoryJson.abi,
      starshipRepositoryAddress
    )) as unknown) as StarshipRepository;

    const goldTokenAddress = await addressRepository.methods
      .getGoldToken()
      .call();
    const goldToken = ((await new web3.eth.Contract(
      resourceTokenJson.abi,
      goldTokenAddress
    )) as unknown) as ResourceToken;

    const ironTokenAddress = await addressRepository.methods
      .getGoldToken()
      .call();
    const ironToken = ((await new web3.eth.Contract(
      resourceTokenJson.abi,
      ironTokenAddress
    )) as unknown) as ResourceToken;

    const oilTokenAddress = await addressRepository.methods
      .getGoldToken()
      .call();
    const oilToken = ((await new web3.eth.Contract(
      resourceTokenJson.abi,
      oilTokenAddress
    )) as unknown) as ResourceToken;

    dispatch(getPlanetsList());
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
