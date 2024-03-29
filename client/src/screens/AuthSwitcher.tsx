import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoadingView } from "rn-web-components";
import { web3Selector } from "../store/web3";
import actions from "../store/actions";
import { Web3Connect } from "../components/Web3Connect";
import { StartGameSwitcher } from "./StartGameSwitcher";

export function AuthSwitcher(): React.ReactElement {
  const dispatch = useDispatch();
  const { status, error } = useSelector(web3Selector);

  useEffect(() => {
    console.log("STATUS", status);
    switch (status) {
      case "WEB3_STARTUP":
        dispatch(actions.web3.connectWeb3());
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    dispatch(actions.web3.connectWeb3());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum]);

  switch (status) {
    default:
    case "WEB3_STARTUP":
      return <LoadingView />;
    case "WEB3_CONNECTED":
      return <StartGameSwitcher />;
    case "NO_WEB3":
      return <Web3Connect error={error || "CONNECTION_ERROR"} />;
  }
}
