import React from "react";
import {Web3Error} from "../store/web3";

export interface Web3ConnectProps {
  error: Web3Error;
}

export function Web3Connect({error}: Web3ConnectProps): React.ReactElement {
  let message = "";
  switch (error) {
    default:
    case "CONNECTION_ERROR":
      message = "Please, connect Metamask or other Web3 provider to continue.";
      break;
    case "WRONG_NETWORK_ERROR":
      message =
        "Sorry, this solution works on BNB network only. Please, switch your metamask and reload the page.";
      break;
  }

  return (
    <div className={"onescreen"} style={{flexDirection: "column"}}>
      <img src={"/logo.png"} alt={"Logo"} style={{height: "120px"}} />
      <h5 style={{marginTop: "20px"}}>{message}</h5>
    </div>
  );
}
