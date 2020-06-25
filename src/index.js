/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import layout from "layouts";

import "assets/css/material-dashboard-react.css?v=1.9.0";

import accountReducer from './stores/AccountStore';
const accountStore = createStore(accountReducer, applyMiddleware(ReduxThunk));

const hist = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={accountStore}>
      <Router history={hist}>
        <Switch>
          <Route path="/" component={layout} />
          <Redirect from="/" to="/accounts-list" />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);