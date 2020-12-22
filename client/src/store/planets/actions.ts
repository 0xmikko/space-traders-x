import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { additionalPlanetInfo, PlanetActions } from "./index";
import { Planet } from "../../core/planet";
import { Planet as PlanetContract } from "../../../../types/ethers-v5/Planet";
import { BigNumber, ethers } from "ethers";

const planetJson = require("../../contracts/core/Planet.sol/Planet.json");

export const getPlanetsList = (): ThunkAction<
  void,
  RootState,
  unknown,
  PlanetActions
> => async (dispatch, getState) => {
  const { planetRepository, signer } = getState().web3;
  if (planetRepository === undefined || signer === undefined) {
    return;
  }

  const qty = (await planetRepository.getPlanetsLength()).toNumber();

  const addressMap: Record<string, Planet> = {};

  for (let i = 0; i < qty; i++) {
    const address = await planetRepository.getPlanetByIndex(i);
    const name = await planetRepository.getPlanetName(i);
    const [x, y] = await planetRepository.getPlanetCoord(i);

    const planetContract = (await ethers.ContractFactory.getContract(
      address,
      planetJson.abi,
      signer
    )) as unknown as PlanetContract;


    const planet = {
      address,
      name,
      x,
      y,
      description: additionalPlanetInfo[name]?.description || "",
      image: additionalPlanetInfo[name]?.image || "",
      contract: planetContract,
    };
    addressMap[address.toLocaleLowerCase()] = planet;
  }
  dispatch({
    type: "PLANETS_LIST",
    payload: addressMap,
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
    oilTokenAddress === undefined ||
    Object.keys(addressMap).length === 0
  )
    return;

  const planet = addressMap[currentPlanet];
  const planetContract = planet.contract;
  if (planetContract === undefined) return;

  const gop = await planetContract.getResourcePrice(
    goldTokenAddress,
    oilTokenAddress
  );

  console.log("GOP", gop);
  const goldOilPrice = BigNumber.from(gop);
  const goldIronPrice = BigNumber.from(
    await planetContract.getResourcePrice(goldTokenAddress, ironTokenAddress)
  );
  const oilIronPrice = BigNumber.from(
    await planetContract.getResourcePrice(oilTokenAddress, ironTokenAddress)
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
