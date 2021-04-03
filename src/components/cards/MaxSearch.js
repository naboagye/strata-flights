import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import DropDown from "components/forms/Dropdown";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Example from "components/custom/DatePicker";
import LookupInput from "components/forms/LookupInput";
import { useHistory } from "react-router-dom";
import { getDDMMYYYY } from "helpers/DurationConverter.js";
import SearchCard from "components/cards/SearchCard.js";
import Filters from "components/forms/Filters";
import SnapshotCard from "components/cards/SnapshotCard.js";
import Sort from "components/forms/Sort";

export const SearchContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 25px;
  padding: 34px 42px 29.99px 38px;
  display: flex;
  align-items: flex-start;
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
  margin-top: 50px;
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

const useStyles = makeStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
  },
}));

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

  //console.log("hi", props.term, props.location);
  //console.log("hello2", fromDate);

  function submit(e) {
    //console.log(oneWayOrReturn, passengersNum, tripClass);
    //console.log(term, fromDate, toDate);
    //e.preventDefault();
  }

  function search(term, code) {
    //console.log(term);
    setTerm(term);
  }
  function search2(term, code) {
    console.log(code);
    setLocation(term);
    setCode(code);
  }

  function getFromDate(term) {
    console.log(term.value);
    setFromDate(term.value);
  }

  function getToDate(term) {
    console.log(term.value);
    setToDate(term.value);
  }

  function getTripClass(term) {
    console.log(term);
    setTripClass(term.name);
  }

  function getPassengerNum(term) {
    console.log(term);
    setPassengersNum(term.name);
  }

  function getOneWayOrReturn(term) {
    console.log(term);
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
    console.log(term);
    setSort(term);
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SnapshotCard code={code} />
        </Grid>
        <Grid item xs={9}>
          <SearchContainer>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FlexWrapperTwo>
                  <FlexWrapperFour>
                    <RoundTripFilter>
                      <DropDown
                        search={getOneWayOrReturn}
                        options={["Round trip", "One way"]}
                      />
                    </RoundTripFilter>
                    <RoundTripFilter>
                      <DropDown search={getPassengerNum} options={["1", "2"]} />
                    </RoundTripFilter>
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
                  </FlexWrapperFour>
                  <RelativeWrapperOne>
                    <FromBox>
                      <LookupInput term={term} search={search} />
                    </FromBox>
                    <ToBox>
                      <LookupInput term={location} search={search2} />
                    </ToBox>
                    <SwitchCircle>
                      <img
                        alt=""
                        src="https://static.overlay-tech.com/assets/8a70bca2-7ef8-44ee-b862-9cae9d136e96.png"
                      />
                    </SwitchCircle>
                  </RelativeWrapperOne>
                </FlexWrapperTwo>
              </Grid>
              <Grid item xs={6}>
                <DatePicker>
                  <Split />
                  <FlexWrapperOne>
                    <Example setDate={fromDate} search={getFromDate} />
                    <Example setDate={toDate} search={getToDate} />
                  </FlexWrapperOne>
                </DatePicker>
              </Grid>
            </Grid>
          </SearchContainer>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default MaxSearch;
