import {RootState} from "../index";
import {SpaceTradersGame} from "../../../../types/ethers-v5/SpaceTradersGame";
import {PlanetRepository} from "../../../../types/ethers-v5/PlanetRepository";
import {StarshipRepository} from "../../../../types/ethers-v5/StarshipRepository";
import {ResourceToken} from "../../../../types/ethers-v5/ResourceToken";
import {Signer} from "ethers";

export const web3Selector = (state: RootState) => state.web3;

export type Web3Error = "NO_ERROR" | "CONNECTION_ERROR" | "WRONG_NETWORK_ERROR";

export type Web3Actions =
  | {
      type: "WEB3_CONNECTED";
      payload: {
        networkId: number;
        account: string;
        signer: Signer;
        game?: SpaceTradersGame;
        planetRepository?: PlanetRepository;
        starshipRepository?: StarshipRepository;

        goldToken?: ResourceToken;
        ironToken?: ResourceToken;
        oilToken?: ResourceToken;

        goldTokenAddress: string;
        ironTokenAddress: string;
        oilTokenAddress: string;
      };
    }
  | {
      type: "WEB3_FAILED";
      payload: { error: Web3Error };
    };
