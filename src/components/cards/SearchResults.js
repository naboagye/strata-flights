import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import DropDown from "components/forms/Dropdown";
import Grid from "@material-ui/core/Grid";
import Example from "components/custom/DatePicker";
import LookupInput from "components/forms/LookupInput";
import SearchCard from "components/cards/SearchCard.js";
import Filters from "components/forms/Filters";
import Sort from "components/forms/Sort";
import Snap from "components/cards/Snap.js";
import tw from "twin.macro";
import { Card } from "react-rainbow-components";
import Hidden from "@material-ui/core/Hidden";
import switch_icon from "images/switch-circle.png";
import EmailUpdateMini from "components/forms/EmailUpdateMini";

export const SearchContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 25px;
  padding: 34px 42px 29.99px 38px;
  display: flex;
  flex-grow: 1;
`;
export const FlexWrapperTwo = styled.div`
  margin-right: 21px;
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
  padding: 16px 18px 12px 26px;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
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
  z-index: 9;
  display: flex;
  align-items: center;
  right: -30px;
  width: 50px;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};

  @media (max-width: 725px) {
    margin-left: auto;
    margin-right: auto;
  }
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
  padding: 16px 18px 12px 26px;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
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

const StyledCard = styled(Card)``;

const LeftColumn = tw.div`relative lg:w-4/12 lg:pr-6 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col`;
const TwoColumn = tw.div`flex flex-col lg:flex-row  max-w-screen-xl mx-auto py-20 md:py-24`;
const Container = tw.div`relative`;

const SearchResults = (props) => {
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
  //const [loadCard, setLoadCard] = useState(term === "" ? false : true);

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
        `https://xtogjhen60.execute-api.eu-west-2.amazonaws.com/dev/locations/id?id=${term}&locale=en-US&location_types=airport&limit=50&active_only=true`
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
          {code !== "" && <Snap code={code} />}
          <EmailUpdateMini code={code} />
        </LeftColumn>
        <RightColumn>
          <StyledCard>
            <SearchContainer>
              <Grid container justify="center" alignItems="center">
                <Hidden xsDown>
                  <Grid item xs={12} sm={4}>
                    <RoundTripFilter>
                      <DropDown
                        search={getOneWayOrReturn}
                        options={["Round trip", "One way"]}
                      />
                    </RoundTripFilter>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <RoundTripFilter>
                      <DropDown
                        search={getPassengerNum}
                        options={["1 Adult", "2 Adults"]}
                      />
                    </RoundTripFilter>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <RoundTripFilter>
                      <DropDown
                        search={getTripClass}
                        options={[
                          "Economy",
                          "Premium Economy",
                          "Business",
                          "First",
                        ]}
                      />
                    </RoundTripFilter>
                  </Grid>
                </Hidden>
                <Grid item xs={12} sm={3}>
                  <FromBox>
                    <LookupInput term={term} search={search} />
                  </FromBox>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <SwitchCircle onClick={switchLocations}>
                    <img alt="switch" src={switch_icon} />
                  </SwitchCircle>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <ToBox>
                    <LookupInput term={location} search={search2} />
                  </ToBox>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <DatePicker>
                    <FlexWrapperOne>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Example setDate={fromDate} search={getFromDate} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Example setDate={toDate} search={getToDate} />
                        </Grid>
                      </Grid>
                    </FlexWrapperOne>
                  </DatePicker>
                </Grid>
              </Grid>
            </SearchContainer>
          </StyledCard>
          <Filters search={pullFilters} />
          <Sort search={getSort} />
          {term && location && fromDate && toDate !== "" && (
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
          )}
        </RightColumn>
      </TwoColumn>
    </Container>
  );
};

export default SearchResults;
