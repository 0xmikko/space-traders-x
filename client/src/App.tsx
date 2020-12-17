import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";
import * as Sentry from "@sentry/browser";

import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {AuthSwitcher} from "./screens/AuthSwitcher";
import {FB_PIXEL, GA_TRACKER, isDev, SENTRY_DSN,} from "./config";
import configureStore from "./store";

library.add(far, fas);

const store = configureStore();

if (!isDev) {
  // Sentry
  Sentry.init({ dsn: SENTRY_DSN });

  // Google analytics
  ReactGA.initialize(GA_TRACKER);
  ReactGA.pageview(window.location.pathname + window.location.search);

  // Facebook Pixel
  const options = {
    autoConfig: true, // set pixel's autoConfig
    debug: false, // enable logs
  };
  ReactPixel.init(FB_PIXEL, undefined, options);
  ReactPixel.pageView();
}

const App = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <AuthSwitcher />
        </BrowserRouter>
      </Provider>
  );
};

export default App;
