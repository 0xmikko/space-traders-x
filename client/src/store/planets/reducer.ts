import {PlanetActions} from "./index";
import {Planet} from "../../core/planet";

export interface PlanetState {
  addressMap: Record<string, Planet>;
}

const initialState: PlanetState = {
  addressMap: {},
};

export default function createReducer(
  state: PlanetState = initialState,
  action: PlanetActions
): PlanetState {
  switch (action.type) {
    case "PLANETS_LIST":
      return {
        ...state,
        addressMap: action.payload,
      };
    case "PLANETS_FAILED":
      return {
        addressMap: {},
      };
    case "PLANETS_UPDATE_PRICES":
      const addressMap = {...state.addressMap}
      const {address, goldOilPrice, goldIronPrice, oilIronPrice } = action.payload
      addressMap[address].goldOilPrice = goldOilPrice;
      addressMap[address].goldIronPrice = goldIronPrice;
      addressMap[address].ironOilPrice = oilIronPrice;

      return {
        ...state,
        addressMap
      }
  }

  return state;
}
