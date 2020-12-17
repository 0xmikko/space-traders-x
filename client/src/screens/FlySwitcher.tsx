/*
 * Copyright (c) 2020. Space Traders
 * Authors: Mikael Lazarev, Ivan Fedorov
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameSelector } from "../store/game";
import actions from "../store/actions";
import { FlyScreen } from "./Fly/FlyScreen";
import { MarketListScreen } from "./Market/MarketListScreen";

export function FlySwitcher(): React.ReactElement {
  const dispatch = useDispatch();
  const [interval, setIntl] = useState<NodeJS.Timeout | undefined>(undefined);
  const { timeToArrive } = useSelector(gameSelector);

  const updateTimeToArrive = () => dispatch(actions.game.updateTimeToArrive());

  useEffect(() => {
    if (timeToArrive > 0) {
      setIntl(setInterval(() => updateTimeToArrive(), 500));
    } else {
      if (interval) clearInterval(interval);
      setIntl(undefined);
    }
  }, [timeToArrive]);

  return timeToArrive > 0 ? <FlyScreen /> : <MarketListScreen />;
}
