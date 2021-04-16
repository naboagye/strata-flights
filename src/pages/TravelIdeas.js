import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import TrendingCard from "components/cards/FullTrending.js";
//import tw from "twin.macro";

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <TrendingCard />
      <Footer />
    </AnimationRevealPage>
  );
};
