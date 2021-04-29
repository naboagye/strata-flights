import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
// import Features from "components/features/ThreeColSimple.js";
// import MainFeature from "components/features/TwoColWithButton.js";
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
// import TabGrid from "components/cards/TabCardGrid.js";
// import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
// import DownloadApp from "components/cta/DownloadApp.js";
import MiniCenteredFooter from "components/footers/MiniCenteredFooter.js";

// import chefIconImageSrc from "images/chef-icon.svg";
// import celebrationIconImageSrc from "images/celebration-icon.svg";
// import shopIconImageSrc from "images/shop-icon.svg";
import eiffel from "images/holidayImages.webp";
// import GetStartedLight from "components/cta/GetStartedLight";
// import UpdatesSignUp from "components/cta/UpdatesSignUp";
import TwoColUpdate from "components/forms/TwoColUpdate";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";

export default () => {
  // const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  // const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  // const Description = tw.span`inline-block mt-8`;
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
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TrendingCard />
      <MiniCenteredFooter />
    </AnimationRevealPage>
  );
};
