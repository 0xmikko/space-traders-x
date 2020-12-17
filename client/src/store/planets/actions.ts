import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { additionalPlanetInfo, PlanetActions } from "./index";
import { Planet } from "../../core/planet";

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

  for (let i = 0; i < qty; i++) {
    const name = await planetRepository.methods.getPlanetName(i).call();
    const { x, y } = await planetRepository.methods.getPlanetCoord(i).call();
    // console.log('DA', data);
    result.push({
      name,
      x: parseInt(x),
      y: parseInt(y),
      description: additionalPlanetInfo[name].description || "",
      image: additionalPlanetInfo[name].image || "",
    });
  }
  dispatch({
    type: "PLANETS_LIST",
    payload: result,
  });
};
