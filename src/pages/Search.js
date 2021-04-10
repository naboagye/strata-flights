import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { useLocation } from "react-router-dom";
import SearchResults from "components/cards/SearchResults.js";
//import tw from "twin.macro";

export default () => {
  const location = useLocation();
  const from = location.state === undefined ? "" : location.state.term.term;
  const to =
    location.state === undefined ? "" : location.state.location.location;
  const fromDate =
    location.state === undefined ? "" : location.state.fromDate.fromDate.value;
  const toDate =
    location.state === undefined ? "" : location.state.toDate.toDate.value;
  const oneWayOrReturn =
    location.state === undefined
      ? ""
      : location.state.oneWayOrReturn.oneWayOrReturn;
  const passengersNum =
    location.state === undefined
      ? ""
      : location.state.passengersNum.passengersNum;
  const tripClass =
    location.state === undefined ? "" : location.state.tripClass.tripClass;
  const code = location.state === undefined ? "" : location.state.code.code;

  return (
    <AnimationRevealPage>
      <Header />
      <SearchResults
        from={from}
        to={to}
        fromDate={fromDate}
        toDate={toDate}
        oneWayOrReturn={oneWayOrReturn}
        passengersNum={passengersNum}
        tripClass={tripClass}
        code={code}
      />
      <Footer />
    </AnimationRevealPage>
  );
};
