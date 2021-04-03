import Example from "components/custom/DatePicker";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import LookupInput from "components/forms/LookupInput";
import { useHistory } from "react-router-dom";
import DropDown from "components/forms/Dropdown";

export const SearchContainer = styled.div`
  background-color: ${(props) => props.theme.colors.snow};
  border-radius: 25px;
  padding: 32px 37px 30.99px 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid ${(props) => props.theme.colors.gainsboro};
`;
export const FlexWrapperTwo = styled.div`
  margin-bottom: 21px;
  padding: 0 0 0 2px;
  display: flex;
  align-items: flex-start;
`;
export const DateDiv = styled.div`
  margin-left: 80px;
`;
export const RoundTripFilter = styled.button`
  display: flex;
  align-items: flex-start;
  &:not(:last-of-type) {
    margin-right: 46px;
  }
`;
export const RoundTripLbl = styled.p`
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito48Regular.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-right: 6px;
  letter-spacing: 0.2px;
`;
export const Icons8SortDown1 = styled.img`
  margin-top: 3px;
`;
export const PassengerFilter = styled.div`
  margin-right: 42px;
  display: flex;
  align-items: flex-start;
`;
export const EconomyLbl = styled.p`
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-right: 5px;
  letter-spacing: 0.2px;
`;
export const RelativeWrapperOne = styled.div`
  margin-bottom: 10px;
  position: relative;
`;
export const FromBox = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 11px 26px 11px 26px;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
  width: 240px;
`;
export const FromLbl = styled.input`
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
  color: ${(props) => props.theme.colors.darkSlateGray};
  letter-spacing: 0.2px;
`;
export const StyledLookup = styled(LookupInput)`
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
  color: ${(props) => props.theme.colors.darkSlateGray};
  letter-spacing: 0.2px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 23px 151px 23px 26px;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
`;
export const ToBox = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 11px 29px 11px 29px;
  position: absolute;
  right: -261px;
  top: 0;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
  width: 240px;
`;
export const SwitchCircle = styled.button`
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
  display: flex;
  align-items: center;
`;
export const RelativeWrapperTwo = styled.div`
  margin-right: 30px;
  position: relative;
`;
export const DatePicker = styled.div`
  padding: 0 0 0.01px;
  position: relative;
`;
export const FlexWrapperOne = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 15px 73px 15px 26px;
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
`;
export const FromDateLbl = styled.p`
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
  color: ${(props) => props.theme.colors.darkSlateGray};
  letter-spacing: 0.2px;
  &:not(:last-of-type) {
    margin-right: 106px;
  }
`;
export const Split = styled.div`
  width: 1px;
  height: 66.01px;
  background-color: ${(props) => props.theme.colors.gainsboro};
  position: absolute;
  left: 230px;
  top: 0;
`;
export const ArrowsGrey = styled.div`
  display: flex;
  align-items: flex-start;
  position: absolute;
  left: 144px;
  top: 20px;
`;
export const ArrowsGreyTwo = styled.div`
  display: flex;
  align-items: flex-start;
  position: absolute;
  right: 19px;
  top: 20px;
`;
export const SearchBtn = styled.button`
  border-radius: 10px;
  padding: 20px 20px 21px;
  display: flex;
  align-items: center;
  background: linear-gradient(
    323deg,
    ${(props) => props.theme.colors.dodgerBlue2} 19%,
    ${(props) => props.theme.colors.dodgerBlue3} 38%,
    ${(props) => props.theme.colors.dodgerBlue} 50%
  );
`;

const SearchContainerComponent = (props) => {
  const [term, setTerm] = useState(props.term || "");
  const [location, setLocation] = useState(props.location || "");
  const [fromDate, setFromDate] = useState(props.fromDate || "");
  const [toDate, setToDate] = useState(props.toDate || "");
  const [oneWayOrReturn, setOneWayOrReturn] = useState(
    props.oneWayOrReturn || "Round trip"
  );
  const [passengersNum, setPassengersNum] = useState(
    props.passengersNum || "1"
  );
  const [tripClass, setTripClass] = useState(props.tripClass || "Economy");
  const [code, setCode] = useState("");
  let history = useHistory();

  function submit(e) {
    //console.log(oneWayOrReturn, passengersNum, tripClass);
    //console.log(fromDate, toDate);
    history.push({
      pathname: "/search",
      state: {
        term: { term },
        code: { code },
        location: { location },
        fromDate: { fromDate },
        toDate: { toDate },
        oneWayOrReturn: { oneWayOrReturn },
        passengersNum: { passengersNum },
        tripClass: { tripClass },
      },
    });
    e.preventDefault();
  }

  function search(term, code) {
    //console.log(term);
    setTerm(term);
  }
  function search2(term, code) {
    //console.log(term);
    setLocation(term);
    setCode(code);
  }

  function getFromDate(term) {
    //console.log(term);
    setFromDate(term);
  }

  function getToDate(term) {
    //console.log(term);
    setToDate(term);
  }

  function getTripClass(term) {
    console.log(term);
    setTripClass(term);
  }

  function getPassengerNum(term) {
    console.log(term);
    setPassengersNum(term);
  }

  function getOneWayOrReturn(term) {
    console.log(term);
    setOneWayOrReturn(term);
  }
  return (
    <SearchContainer>
      <FlexWrapperTwo>
        <RoundTripFilter onClick={(e) => setOneWayOrReturn(e.target.innerText)}>
          <DropDown
            search={getOneWayOrReturn}
            options={["Round trip", "One way"]}
          />
        </RoundTripFilter>
        <RoundTripFilter onClick={(e) => setPassengersNum(e.target.innerText)}>
          <DropDown search={getPassengerNum} options={["1", "2"]} />
        </RoundTripFilter>
        <RoundTripFilter onClick={(e) => setTripClass(e.target.innerText)}>
          <DropDown
            search={getTripClass}
            options={["Economy", "Premium Economy", "Business", "First"]}
          />
        </RoundTripFilter>
      </FlexWrapperTwo>
      <RelativeWrapperOne>
        <FromBox>
          <LookupInput term="From?" search={search} />
        </FromBox>
        <ToBox>
          <LookupInput term="To?" search={search2} />
        </ToBox>
        <SwitchCircle>
          <img
            alt=""
            src="https://static.overlay-tech.com/assets/947a335b-66b9-4f2a-85d9-efaabec6671a.png"
          />
        </SwitchCircle>
      </RelativeWrapperOne>
      <FlexWrapperThree>
        <RelativeWrapperTwo>
          <DatePicker>
            <FlexWrapperOne>
              <Example search={getFromDate} />
              <Example search={getToDate} />
            </FlexWrapperOne>
            <Split />
          </DatePicker>
        </RelativeWrapperTwo>
        <SearchBtn onClick={submit}>
          <img
            alt=""
            src="https://static.overlay-tech.com/assets/6ca73bc8-b5fc-4fee-8193-7ac133bc88cf.png"
          />
        </SearchBtn>
      </FlexWrapperThree>
    </SearchContainer>
  );
};

export default SearchContainerComponent;
