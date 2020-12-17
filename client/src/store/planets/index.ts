import {RootState} from '../index';
import {Planet} from "../../core/planet";


export const planetsSelector = (state: RootState) => state.planets;

export type PlanetActions =
  | {
      type: 'PLANETS_LIST';
      payload: Array<Planet>;

    }
  | {
      type: 'PLANETS_FAILED';
    };

export interface AdditionalPlanetInfo {
    description: string,
    image: string,
}

export const additionalPlanetInfo : Record<string, AdditionalPlanetInfo> = {

}
