import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import Homepage from "pages/Homepage.js";
import Search from "pages/Search.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TravelIdeas from "pages/TravelIdeas.js";
import EmailSuccess from "pages/EmailSuccess.js";
import EmailFailure from "pages/EmailFailure.js";
import TravelAdvice from "pages/TravelAdvice";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/travel-ideas">
          <TravelIdeas />
        </Route>
        <Route path="/success">
          <EmailSuccess />
        </Route>
        <Route path="/failure">
          <EmailFailure />
        </Route>
        <Route path="/travel-advice">
          <TravelAdvice />
        </Route>
      </Switch>
    </Router>
  );
}
