import React from "react";
import { withTracker } from "../components/withTrackerHOC";
import { Route, Switch } from "react-router";
import { FlyScreen } from "./Fly/FlyScreen";
import { MarketListScreen } from "./Market/MarketListScreen";
import { StartGameScreen } from "./Start/StartGameScreen";

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/market" component={withTracker(MarketListScreen)} />
      <Route exact path="/fly/:name" component={withTracker(FlyScreen)} />
      <Route exact path="/" component={withTracker(StartGameScreen)} />
      {/*} <Redirect to={"/market"} /> */}
    </Switch>
  );
};
