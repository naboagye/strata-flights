import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import DropDown from "components/forms/Dropdown";
import Grid from "@material-ui/core/Grid";
import Example from "components/custom/DatePicker";
import LookupInput from "components/forms/LookupInput";
import SearchCard from "components/cards/SearchCard.js";
import Filters from "components/forms/Filters";
import SnapshotCard from "components/cards/SnapshotCard.js";
import Sort from "components/forms/Sort";
import Snap from "components/cards/Snap.js";
import tw from "twin.macro";
import switch_icon from "images/switch-circle.png";

export const SearchContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 25px;
  padding: 34px 42px 29.99px 38px;
  display: flex;
  align-items: flex-start;
`;
export const FlexWrapperTwo = styled.div`
  margin-right: 0px;
  padding: 0 2px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const FlexWrapperFour = styled.div`
  margin-bottom: 21px;
  padding: 0 0 0 2px;
  display: flex;
  align-items: flex-start;
`;
export const RoundTripFilter = styled.div`
  display: flex;
  align-items: flex-start;
  &:not(:last-of-type) {
    margin-right: 46px;
  }
`;
export const RoundTripLbl = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-right: 6px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const Icons8SortDown1 = styled.img`
  margin-top: 3px;
`;
export const RelativeWrapperOne = styled.div`
  position: relative;
`;
export const FromBox = styled.div`
  background-color: ${(props) => props.theme.colors.snow};
  border-radius: 10px;
  padding: 18px 26px 20px 26px;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
  width: 240px;
`;
export const FromDest = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
`;
export const FromAirport = styled.p`
  color: ${(props) => props.theme.colors.gray};
  position: absolute;
  left: 93px;
  bottom: 23px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const SwitchCircle = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  padding: 11px 12px 12px 11px;
  display: flex;
  align-items: center;
  position: absolute;
  right: -41px;
  top: 8px;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
`;
export const FlexWrapperThree = styled.div`
  margin-right: 9px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const EconomyFilter = styled.div`
  margin-bottom: 21px;
  margin-left: 21px;
  display: flex;
  align-items: flex-start;
`;
export const EcLabel = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-right: 5px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const ToBox = styled.div`
  background-color: ${(props) => props.theme.colors.snow};
  border-radius: 10px;
  padding: 18px 29px 20px 29px;
  position: absolute;
  right: -261px;
  top: 0;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
  width: 240px;
`;
export const ToAirport = styled.p`
  color: ${(props) => props.theme.colors.gray};
  position: absolute;
  right: 92px;
  bottom: 23px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const DatePicker = styled.div`
  padding: 0 0 0.01px;
  position: relative;
`;
export const Split = styled.div`
  width: 1px;
  height: 66.01px;
  background-color: ${(props) => props.theme.colors.gainsboro};
  position: absolute;
  left: 208px;
  top: 0;
`;
export const FlexWrapperOne = styled.div`
  background-color: ${(props) => props.theme.colors.snow};
  border-radius: 10px;
  padding: 19px 18px 20px 26px;
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
`;
export const FromLbl = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-right: 23px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
`;
export const ArrowsGrey = styled.div`
  display: flex;
  align-items: flex-start;
  &:not(:last-of-type) {
    margin-right: 33px;
  }
`;
export const ToLbl = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-right: 20px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
`;

const StyledGrid = styled.div`
  margin-top: 100px;
`;

const LeftColumn = tw.div`relative lg:w-4/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const Container = tw.div`relative`;

const MaxSearch = (props) => {
  const [term, setTerm] = useState(props.from || "");
  const [location, setLocation] = useState(props.to || "");
  const [fromDate, setFromDate] = useState(props.fromDate || "");
  const [toDate, setToDate] = useState(props.toDate || "");
  const [oneWayOrReturn, setOneWayOrReturn] = useState(
    props.oneWayOrReturn || "Round trip"
  );
  const [passengersNum, setPassengersNum] = useState(
    props.passengersNum || "1"
  );
  const [tripClass, setTripClass] = useState(props.tripClass || "Economy");
  const [maxStopsNum, setMaxStopsNum] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [code, setCode] = useState(props.code || "");
  const [outbound, setOutbound] = useState([0, 23]);
  const [inbound, setInbound] = useState([0, 23]);
  const [sort, setSort] = useState("price");
  const options = {
    headers: { apiKey: "H9cYBRBqvEQ9jTIoSMoKb-8ft15P0dCz" },
  };

  function search(term, code) {
    //console.log(term);
    setTerm(term);
  }
  function search2(term, code) {
    //console.log(code);
    setLocation(term);
    setCode(code);
  }

  function getFromDate(term) {
    //console.log(term.value);
    setFromDate(term.value);
  }

  function getToDate(term) {
    //console.log(term.value);
    setToDate(term.value);
  }

  function getTripClass(term) {
    //console.log(term);
    setTripClass(term.name);
  }

  function getPassengerNum(term) {
    //console.log(term);
    setPassengersNum(term.name);
  }

  function getOneWayOrReturn(term) {
    //console.log(term);
    setOneWayOrReturn(term.name);
  }

  function pullFilters(filters) {
    //console.log(filters);
    filters[0].value ? setMaxStopsNum(0) : setMaxStopsNum("");
    setMinPrice(0);
    filters[1] ? setMaxPrice(500) : setMaxPrice("");
    setOutbound(filters[4]);
    setInbound(filters[5]);
  }

  function getSort(term) {
    //console.log(term);
    setSort(term);
  }

  const switchLocations = async () => {
    setTerm(location);
    setLocation(term);
    await axios
      .get(
        `https://tequila-api.kiwi.com/locations/id?id=${term}&locale=en-US&location_types=airport&limit=50&active_only=true`,
        options
      )
      .then((response) => {
        //console.log(response.data.locations);
        setCode(response.data.locations[0].city.country.code);
      });
  };

  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <Snap code={code} />
        </LeftColumn>
        <RightColumn>
          <FlexWrapperFour>
            <RoundTripFilter>
              <DropDown
                search={getOneWayOrReturn}
                options={["Round trip", "One way"]}
              />
            </RoundTripFilter>
            <RoundTripFilter>
              <DropDown
                search={getPassengerNum}
                options={["1 Adult", "2 Adults"]}
              />
            </RoundTripFilter>
            <RoundTripFilter>
              <DropDown
                search={getTripClass}
                options={["Economy", "Premium Economy", "Business", "First"]}
              />
            </RoundTripFilter>
          </FlexWrapperFour>
          <FlexWrapperTwo>
            <RelativeWrapperOne>
              <FromBox>
                <LookupInput term={term} search={search} />
              </FromBox>
              <ToBox>
                <LookupInput term={location} search={search2} />
              </ToBox>
              <SwitchCircle onClick={switchLocations}>
                <img alt="switch" src={switch_icon} />
              </SwitchCircle>
            </RelativeWrapperOne>
          </FlexWrapperTwo>
          <FlexWrapperOne>
            <Example setDate={fromDate} search={getFromDate} />
            <Split />
            <Example setDate={toDate} search={getToDate} />
          </FlexWrapperOne>
          <Filters search={pullFilters} />
          <Sort search={getSort} />
          <SearchCard
            from={term}
            to={location}
            fromDate={fromDate}
            toDate={toDate}
            oneWayOrReturn={oneWayOrReturn}
            passengersNum={passengersNum}
            tripClass={tripClass}
            maxStopsNum={maxStopsNum}
            minPrice={minPrice}
            maxPrice={maxPrice}
            outbound={outbound}
            inbound={inbound}
            isLoading={true}
            sort={sort}
          />
        </RightColumn>
      </TwoColumn>
    </Container>
  );
};

export default MaxSearch;
