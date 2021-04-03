import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Card } from "react-rainbow-components";

// Nested component imports
import Cancel from "components/forms/Cancel.js";
import PopoverSlider from "./PopoverSlider.js";
import PopoverCheckbox from "./PopoverCheckbox.js";

export const FiltersBox = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const StopsFtr = styled.div`
  margin-top: 1px;
  margin-right: 14px;
  border-radius: 10px;
  padding: 7px 6.72px 5.72px 15px;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.selected
      ? css`
           linear-gradient(
            270deg,
            ${(props) => props.theme.colors.dodgerBlue2} 11%,
            ${(props) => props.theme.colors.dodgerBlue3} 23%,
            ${(props) => props.theme.colors.dodgerBlue} 50%
          );
        `
      : props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
`;
export const MaxStops = styled.p`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.white
      : props.theme.colors.darkSlateGray};
  margin-right: 17px;
  letter-spacing: 0.2px;
  font-family: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.family
      : props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.size
      : props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.weight
      : props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.lineHeight
      : props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const StyledCancel = styled(Cancel)``;
export const WifiFtr = styled.div`
  margin-top: 1px;
  border-radius: 10px;
  padding: 7px 6.72px 5.72px 15px;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
  &:not(:last-of-type) {
    margin-right: 16px;
  }
  background: ${(props) =>
    props.selected
      ? css`
           linear-gradient(
            270deg,
            ${(props) => props.theme.colors.dodgerBlue2} 11%,
            ${(props) => props.theme.colors.dodgerBlue3} 23%,
            ${(props) => props.theme.colors.dodgerBlue} 50%
          );
        `
      : props.theme.colors.white};
`;
export const Filter1Txt = styled.p`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.white
      : props.theme.colors.darkSlateGray};
  letter-spacing: 0.2px;
  font-family: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.family
      : props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.size
      : props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.weight
      : props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.lineHeight
      : props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const PriceFtr = styled.div`
  margin-top: 1px;
  margin-right: 16px;
  border-radius: 10px;
  padding: 7px 6.72px 5.72px 15px;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.selected
      ? css`
           linear-gradient(
            270deg,
            ${(props) => props.theme.colors.dodgerBlue2} 11%,
            ${(props) => props.theme.colors.dodgerBlue3} 23%,
            ${(props) => props.theme.colors.dodgerBlue} 50%
          );
        `
      : props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
`;
export const TimesFtr = styled.div`
  margin-top: 1px;
  margin-right: 16px;
  border-radius: 10px;
  padding: 7px 6.72px 5.72px 15px;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.selected
      ? css`
           linear-gradient(
            270deg,
            ${(props) => props.theme.colors.dodgerBlue2} 11%,
            ${(props) => props.theme.colors.dodgerBlue3} 23%,
            ${(props) => props.theme.colors.dodgerBlue} 50%
          );
        `
      : props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
`;
export const AirlinesFtr = styled.div`
  background: ${(props) =>
    props.selected
      ? css`
           linear-gradient(
            270deg,
            ${(props) => props.theme.colors.dodgerBlue2} 11%,
            ${(props) => props.theme.colors.dodgerBlue3} 23%,
            ${(props) => props.theme.colors.dodgerBlue} 50%
          );
        `
      : props.theme.colors.white};
  margin-right: 16px;
  border-radius: 10px;
  padding: 7px 6.72px 5.72px 15px;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
`;

const Filters = (props) => {
  const [stopsFtr, setStopsFtr] = useState({ name: "stops", value: false });
  const [airlinesFtr, setAirlinesFtr] = useState(false);
  const [priceFtr, setPriceFtr] = useState(false);
  const [timesFtr, setTimesFtr] = useState(false);
  const [outbound, setOutbound] = useState([0, 23]);
  const [inbound, setInbound] = useState([0, 23]);

  function submit(keyword) {
    if (typeof props.search === "function") {
      props.search(keyword);
    }
    //console.log(keyword);
  }

  function getTimes(outbound, inbound) {
    setOutbound(outbound);
    setInbound(inbound);
    console.log(outbound, inbound);
  }

  function getAirlines(term) {
    console.log(term);
  }

  useEffect(() => {
    console.log("filter change");
    submit([stopsFtr, priceFtr, timesFtr, airlinesFtr, outbound, inbound]);
  }, [stopsFtr, airlinesFtr, priceFtr, timesFtr, outbound, inbound]);

  return (
    <FiltersBox>
      <StopsFtr
        selected={stopsFtr.value}
        onClick={() => {
          setStopsFtr({ name: stopsFtr.name, value: true });
        }}
      >
        <MaxStops selected={stopsFtr.value}>Direct flights only</MaxStops>
        {stopsFtr.value && (
          <StyledCancel
            onClick={(e) => {
              e.stopPropagation();
              setStopsFtr({ name: stopsFtr.name, value: false });
            }}
          />
        )}
      </StopsFtr>
      <PriceFtr selected={priceFtr} onClick={() => setPriceFtr(true)}>
        <MaxStops selected={priceFtr}>Under £500</MaxStops>
        {priceFtr && (
          <StyledCancel
            onClick={(e) => {
              e.stopPropagation();
              setPriceFtr(false);
            }}
          />
        )}
      </PriceFtr>
      <PopoverSlider
        selected={timesFtr}
        onClick={() => setTimesFtr(true)}
        search={getTimes}
      >
        <MaxStops selected={timesFtr}>Times</MaxStops>
        {timesFtr && (
          <StyledCancel
            onClick={(e) => {
              e.stopPropagation();
              setTimesFtr(false);
            }}
          />
        )}
      </PopoverSlider>
      <AirlinesFtr selected={airlinesFtr} onClick={() => setAirlinesFtr(true)}>
        <MaxStops selected={airlinesFtr}>Airlines</MaxStops>
        {airlinesFtr && (
          <StyledCancel
            onClick={(e) => {
              e.stopPropagation();
              setAirlinesFtr(false);
            }}
          />
        )}
      </AirlinesFtr>
      <WifiFtr>
        <MaxStops>More</MaxStops>
      </WifiFtr>
      <PopoverCheckbox search={getAirlines}>
        <MaxStops selected={timesFtr}>Times</MaxStops>
      </PopoverCheckbox>
    </FiltersBox>
  );
};

export default Filters;
