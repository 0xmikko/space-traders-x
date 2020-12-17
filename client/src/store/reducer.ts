/*
 * Stackdrive. Self-order apps for business
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {combineReducers} from "redux";
import tokens from "./tokens/reducer";
import planets from "./planets/reducer";
import web3 from "./web3/reducer";


export default combineReducers({
 tokens,
 planets,
 web3
});
