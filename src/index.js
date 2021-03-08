import React from "react";
import ReactDOM from "react-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react"
import { BrowserRouter as Router } from "react-router-dom";
import Analytics from "react-router-ga";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ShopProvider from "./context/shopContext";
import BlogProvider from "./context/blogContext";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();

ReactDOM.render(
  <ShopProvider>
    <BlogProvider>
      <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <Router>
          <Analytics id="UA-191601925-1" debug>
            <App />
          </Analytics>
        </Router>
      </StyletronProvider>
    </BlogProvider>
  </ShopProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
