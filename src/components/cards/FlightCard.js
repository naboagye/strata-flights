import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export const SearchRes2 = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 25px;
  padding: 0 28px 0 49px;
  display: flex;
  align-items: flex-start;
`;
export const RelativeWrapperOne = styled.div`
  margin-top: 38px;
  margin-right: 52px;
  position: relative;
`;
export const AusImg = styled.img`
  position: relative;
`;
export const AusImgTwo = styled.img`
  position: absolute;
  left: 0;
  bottom: -62px;
`;
export const FlexWrapperOne = styled.div`
  margin-right: 10px;
  padding: 51px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const TimeTxt = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-bottom: 2px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18Bold.family};
  font-size: ${(props) => props.theme.fonts.nunito18Bold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18Bold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18Bold.lineHeight};
`;
export const AirlineTxt = styled.p`
  color: ${(props) => props.theme.colors.gray};
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
  &:not(:last-of-type) {
    margin-bottom: 24px;
  }
`;
export const FlexWrapperTwo = styled.div`
  margin-right: 140px;
  padding: 48px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const StopsTxt = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-bottom: 5px;
  margin-left: 4px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18Bold.family};
  font-size: ${(props) => props.theme.fonts.nunito18Bold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18Bold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18Bold.lineHeight};
`;
export const AirportCodeTxt = styled.p`
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 24px;
  margin-left: 2px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const StopTxt = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-bottom: 2px;
  margin-left: 4px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18Bold.family};
  font-size: ${(props) => props.theme.fonts.nunito18Bold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18Bold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18Bold.lineHeight};
`;
export const AirportCodeTxtTwo = styled.p`
  color: ${(props) => props.theme.colors.gray};
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const FlexWrapperThree = styled.div`
  margin-right: 83px;
  padding: 51px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const TimeTxtTwo = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18Bold.family};
  font-size: ${(props) => props.theme.fonts.nunito18Bold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18Bold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18Bold.lineHeight};
  &:not(:last-of-type) {
    margin-bottom: 2px;
  }
`;
export const StopoverTxt = styled.p`
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 24px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const SplitPrice = styled.div`
  width: 1px;
  height: 185px;
  background-color: ${(props) => props.theme.colors.gainsboro};
  margin-right: 26px;
`;
export const FlexWrapperFour = styled.div`
  padding: 60px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const PriceTxt = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-bottom: 24px;
  margin-left: 20px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36Bold.family};
  font-size: ${(props) => props.theme.fonts.nunito36Bold.size};
  font-weight: ${(props) => props.theme.fonts.nunito36Bold.weight};
  line-height: ${(props) => props.theme.fonts.nunito36Bold.lineHeight};
`;
export const ViewDealBtn = styled.button`
  border-radius: 10px;
  padding: 12px 36px 11px;
  display: flex;
  align-items: center;
  background: linear-gradient(
    270deg,
    ${(props) => props.theme.colors.dodgerBlue2} 11%,
    ${(props) => props.theme.colors.dodgerBlue3} 23%,
    ${(props) => props.theme.colors.dodgerBlue} 50%
  );
`;
export const DealTxt = styled.p`
  color: ${(props) => props.theme.colors.white};
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13Bold.family};
  font-size: ${(props) => props.theme.fonts.nunito13Bold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13Bold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13Bold.lineHeight};
`;

const FlightCard = (props) => {
  const [airline1, setAirline1] = useState(null);
  const [airline2, setAirline2] = useState(null);
  const openLink = () => {
    window.open(props.link);
  };

  const getAirline = async (code) => {
    const response = await axios
      .get(
        `http://airlabs.co/api/v7/airlines?api_key=4e9893ee-77ee-497e-bca6-0e3220c26fee&iata_code=${code}`
      )
      .then((response) => {
        //console.log(response.data.response[0].name);
        setAirline1(response.data.response[0].name);
      });
  };

  const getAirline2 = async (code) => {
    const response = await axios
      .get(
        `http://airlabs.co/api/v7/airlines?api_key=4e9893ee-77ee-497e-bca6-0e3220c26fee&iata_code=${code}`
      )
      .then((response) => {
        //console.log(response.data.response[0].name);
        setAirline2(response.data.response[0].name);
      })
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          setAirline2("");
        }
      });
  };

  useEffect(() => {
    getAirline(props.obdAirline);
    getAirline2(props.ibdAirline);
    //console.log("got airline");
  }, [props.obdAirline, props.ibdAirline]);

  return (
    <SearchRes2 onClick={openLink}>
      <RelativeWrapperOne>
        <AusImg
          alt=""
          src={`https://daisycon.io/images/airline/?width=200&height=50&color=ffffff&iata=${props.obdAirline}`}
        />
        <AusImgTwo
          alt=""
          src={`https://daisycon.io/images/airline/?width=200&height=50&color=ffffff&iata=${props.ibdAirline}`}
        />
      </RelativeWrapperOne>
      <FlexWrapperOne>
        <TimeTxt>
          {props.obdDptTime} - {props.obdArrTime}
          {props.obdDptTime.substr(0, 2) < props.obdArrTime.substr(0, 2) ? (
            ""
          ) : (
            <sup>+1</sup>
          )}
        </TimeTxt>
        <AirlineTxt>{airline1}</AirlineTxt>
        <TimeTxt>
          {props.ibdDptTime} - {props.ibdArrTime}
          {props.ibdDptTime.substr(0, 2) > props.ibdArrTime.substr(0, 2) && (
            <sup>+1</sup>
          )}
        </TimeTxt>
        <AirlineTxt>{airline2}</AirlineTxt>
      </FlexWrapperOne>
      <FlexWrapperTwo>
        <StopsTxt>{props.obdNumStops}</StopsTxt>
        <AirportCodeTxt>
          {props.obdDptAirportCode}-{props.obdArrAirportCode}
        </AirportCodeTxt>
        <StopTxt>{props.ibdNumStops}</StopTxt>
        <AirportCodeTxtTwo>
          {props.ibdDptAirportCode}-{props.ibdArrAirportCode}
        </AirportCodeTxtTwo>
      </FlexWrapperTwo>
      <FlexWrapperThree>
        <TimeTxtTwo>{props.obdDuration}</TimeTxtTwo>
        <StopoverTxt>
          {props.obdStopDuration} {props.obdStopAirportCode}
        </StopoverTxt>
        <TimeTxtTwo>{props.ibdDuration}</TimeTxtTwo>
        <StopoverTxt>
          {props.ibdStopDuration} {props.ibdStopAirportCode}
        </StopoverTxt>
      </FlexWrapperThree>
      <SplitPrice />
      <FlexWrapperFour>
        <PriceTxt>£{props.price}</PriceTxt>
        <ViewDealBtn onClick={openLink}>
          <DealTxt>View Deal</DealTxt>
        </ViewDealBtn>
      </FlexWrapperFour>
    </SearchRes2>
  );
};

export default FlightCard;
