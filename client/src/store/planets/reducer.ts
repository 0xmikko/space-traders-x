import { PlanetActions } from "./index";
import { Planet } from "../../core/planet";

export interface PlanetState {
  data: Array<Planet>;
}

const initialState: PlanetState = {
  data: [],
};

export default function createReducer(
  state: PlanetState = initialState,
  action: PlanetActions
): PlanetState {
  switch (action.type) {
    case "PLANETS_LIST":
      return {
        data: action.payload,
      };
    case "PLANETS_FAILED":
      return {
        data: [],
      };
  }

  return state;
}
