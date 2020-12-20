import { Web3Actions, Web3Error } from "./index";
import { SpaceTradersGame } from "../../../../types/ethers-v5/SpaceTradersGame";
import { PlanetRepository } from "../../../../types/ethers-v5/PlanetRepository";
import { StarshipRepository } from "../../../../types/ethers-v5/StarshipRepository";
import { ResourceToken } from "../../../../types/ethers-v5/ResourceToken";
import { Signer } from "ethers";

export interface Web3State {
  account?: string;
  signer?: Signer;
  game?: SpaceTradersGame;
  planetRepository?: PlanetRepository;
  starshipRepository?: StarshipRepository;

  goldToken?: ResourceToken;
  ironToken?: ResourceToken;
  oilToken?: ResourceToken;

  goldTokenAddress?: string;
  ironTokenAddress?: string;
  oilTokenAddress?: string;

  status: "WEB3_STARTUP" | "WEB3_CONNECTED" | "NO_WEB3";
  error?: Web3Error;
}

const initialState: Web3State = {
  status: "WEB3_STARTUP",
};

export default function createReducer(
  state: Web3State = initialState,
  action: Web3Actions
): Web3State {
  switch (action.type) {
    case "WEB3_CONNECTED":
      return {
        ...action.payload,
        status: "WEB3_CONNECTED",
      };
    case "WEB3_FAILED":
      return {
        account: undefined,
        signer: undefined,
        status: "NO_WEB3",
        error: action.payload.error,
      };
  }

  return state;
}
