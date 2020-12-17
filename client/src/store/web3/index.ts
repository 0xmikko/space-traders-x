import Web3 from 'web3';
import {RootState} from '../index';
import {SpaceTradersGame} from "../../../../types/web3-v1-contracts/SpaceTradersGame";
import {PlanetRepository} from "../../../../types/web3-v1-contracts/PlanetRepository";
import {StarshipRepository} from "../../../../types/web3-v1-contracts/StarshipRepository";
import {ResourceToken} from "../../../../types/web3-v1-contracts/ResourceToken";

export const web3Selector = (state: RootState) => state.web3;

export type Web3Error = 'NO_ERROR' | 'CONNECTION_ERROR' | 'WRONG_NETWORK_ERROR';

export type Web3Actions =
  | {
      type: 'WEB3_CONNECTED';
      payload: {
        web3: Web3;
        networkId: number;
        accounts: Array<string>;
          game?: SpaceTradersGame;
          planetRepository?: PlanetRepository;
          starshipRepository?: StarshipRepository;

          goldToken?: ResourceToken;
          ironToken?: ResourceToken;
          oilToken?: ResourceToken;
      };
    }
  | {
      type: 'WEB3_FAILED';
      payload: {error: Web3Error};
    };
