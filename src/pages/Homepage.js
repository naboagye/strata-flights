import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/HeroHeader.js";

import MiniCenteredFooter from "components/footers/MiniCenteredFooter.js";

import eiffel from "images/holidayImages.webp";
import TwoColUpdate from "components/forms/TwoColUpdate";
import TrendingCard from "components/cards/MiniTrending.js";

export default () => {
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            Find flights with ease without worrying about{" "}
            <HighlightedText>COVID-19 restrictions.</HighlightedText>
          </>
        }
        description="We do the work for you and find out the latest on COVID-19 for the destinations you want to travel to."
        imageSrc={eiffel}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Order Now"
        watchVideoButtonText="Find Out More"
      />
      <TwoColUpdate />
      <TrendingCard />
      <MiniCenteredFooter />
    </AnimationRevealPage>
  );
};
