import {PlanetActions} from "./index";
import {Planet} from "../../core/planet";

export interface PlanetState {
  data: Array<Planet>;
  addressMap: Record<string, Planet>;
}

const initialState: PlanetState = {
  data: [],
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
        data: action.payload.array,
        addressMap: action.payload.map,
      };
    case "PLANETS_FAILED":
      return {
        data: [],
        addressMap: {},
      };
  }

  return state;
}
