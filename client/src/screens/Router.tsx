import React from "react";
import {withTracker} from "../components/withTrackerHOC";
import {Redirect, Route, Switch} from "react-router";
import {DepositListScreen} from "./Deposit/DepositListScreen";
import {FlyScreen} from "./Fly/FlyScreen";
import {MarketListScreen} from "./Market/MarketListScreen";
import {DepositNewScreen} from "./Deposit/DepositNewScreen";
import {StartGameScreen} from "./Start/StartGameScreen";

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/market" component={withTracker(MarketListScreen)} />
      <Route
        exact
        path="/fly/:name"
        component={withTracker(FlyScreen)}
      />
      <Route
        exact
        path="/deposits"
        component={withTracker(DepositListScreen)}
      />

      <Route exact path="/" component={withTracker(StartGameScreen)} />
      {/*} <Redirect to={"/market"} /> */}
    </Switch>
  );
};
