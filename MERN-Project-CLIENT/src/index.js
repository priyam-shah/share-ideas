import React from "react";
import ReactDOM from "react-dom";

// initializing redux
import { Provider } from "react-redux";
// Provider is going to keep track of that store which is that global state
//  -- and that allows us to acess that store from any where inside the app
// --- we dont have to be in a parent component or a child component

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./reducers";
import App from "./App";
import "./index.css";

//to set redux --> 1st set store
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
