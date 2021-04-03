import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import ContactDetails from "components/cards/ThreeColContactDetails.js";
import SearchCard from "components/cards/SearchCard.js";
import { useLocation } from "react-router-dom";
import DropDown from "components/forms/Dropdown.js";
import MaxSearch from "components/cards/MaxSearch";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { Card } from "react-rainbow-components";
import SnapshotCard from "components/cards/SnapshotCard.js";

const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Phone = tw.span`text-sm mt-0 block text-gray-500`;
const StyledCard = styled(Card)`
  width: 990px;
  height: 200px;
`;

export default (props) => {
  const location = useLocation();
  //console.log(location.term, location.location)
  //console.log(location.state.term.term);
  //console.log(location.state.location.location);
  //console.log(location.state.code.code);
  //const [code, setCode] = useState(location.state.code.code);

  // function getDestCode(term) {
  //   console.log(term);
  //   setCode(term);
  // }
  console.log();
  return (
    <AnimationRevealPage>
      <Header />
      <MaxSearch
        from={location.state.term.term}
        to={location.state.location.location}
        fromDate={location.state.fromDate.fromDate.value}
        toDate={location.state.toDate.toDate.value}
        oneWayOrReturn={location.state.oneWayOrReturn.oneWayOrReturn}
        passengersNum={location.state.passengersNum.passengersNum}
        tripClass={location.state.tripClass.tripClass}
        code={location.state.code.code}
      />
      <Footer />
    </AnimationRevealPage>
  );
};
