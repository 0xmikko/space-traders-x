import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { additionalPlanetInfo, PlanetActions } from "./index";
import { Planet } from "../../core/planet";
import { Planet as PlanetContract } from "../../../../types/web3-v1-contracts/Planet";
import { TokenActions } from "../tokens";

const planetJson = require("../../contracts/core/Planet.sol/Planet.json");

export const getPlanetsList = (): ThunkAction<
  void,
  RootState,
  unknown,
  PlanetActions
> => async (dispatch, getState) => {
  const result: Array<Planet> = [];
  const { planetRepository } = getState().web3;
  if (planetRepository === undefined) {
    return;
  }

  const web3 = await getState().web3.web3;
  if (web3 === null) throw new Error("Web3 is null!");
  // console.log(await providerRepository?.methods.)

  const qty = parseInt(
    await planetRepository.methods.getPlanetsLength().call()
  );

  const addressMap: Record<string, Planet> = {};

  for (let i = 0; i < qty; i++) {
    const address = await planetRepository.methods.getPlanetByIndex(i).call();
    const name = await planetRepository.methods.getPlanetName(i).call();
    const { x, y } = await planetRepository.methods.getPlanetCoord(i).call();
    // console.log('DA', data);

    const planetContract = ((await new web3.eth.Contract(
      planetJson.abi,
      address
    )) as unknown) as PlanetContract;

    const planet = {
      address,
      name,
      x: parseInt(x),
      y: parseInt(y),
      description: additionalPlanetInfo[name]?.description || "",
      image: additionalPlanetInfo[name]?.image || "",
      contract: planetContract,
    };
    result.push(planet);
    addressMap[address.toLocaleLowerCase()] = planet;
  }
  dispatch({
    type: "PLANETS_LIST",
    payload: {
      array: result,
      map: addressMap,
    },
  });
};

export const updateTokenPrices = (): ThunkAction<
  void,
  RootState,
  unknown,
  PlanetActions
> => async (dispatch, getState) => {
  const {
    goldTokenAddress,
    ironTokenAddress,
    oilTokenAddress,
  } = await getState().web3;
  const { currentPlanet } = await getState().game;
  const { addressMap } = await getState().planets;
  if (
    currentPlanet === undefined ||
    addressMap === undefined ||
    goldTokenAddress === undefined ||
    ironTokenAddress === undefined ||
    oilTokenAddress === undefined
  )
    return;

  const planet = addressMap[currentPlanet];
  const planetContract = planet.contract;
  if (planetContract === undefined) return;
  const goldOilPrice = parseInt(
    await planetContract.methods
      .getResourcePrice(goldTokenAddress, oilTokenAddress)
      .call()
  );
  const goldIronPrice = parseInt(
    await planetContract.methods
      .getResourcePrice(goldTokenAddress, ironTokenAddress)
      .call()
  );
  const oilIronPrice = parseInt(
    await planetContract.methods
      .getResourcePrice(oilTokenAddress, ironTokenAddress)
      .call()
  );

  dispatch({
    type: "PLANETS_UPDATE_PRICES",
    payload: {
      address: currentPlanet,
      goldOilPrice,
      goldIronPrice,
      oilIronPrice,
    },
  });
};
