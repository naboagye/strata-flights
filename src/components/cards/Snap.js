import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Modal } from "react-rainbow-components";
import axios from "axios";
import tw from "twin.macro";
import Grid from "@material-ui/core/Grid";
import { getYYYYMMDD } from "helpers/DurationConverter";
import Hidden from "@material-ui/core/Hidden";

import up_icon from "images/up_icon.png";
import down_icon from "images/down_icon.png";
import external_link_icon from "images/external_link_icon.png";
import { SectionHeading } from "components/misc/Headings.js";
import SnapPlaceholder from "images/snap_placeholder.svg";
import Disclaimer from "components/custom/Disclaimer";

export const Snapshot = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 25px;
  padding: 26px 23px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const FlexWrapperOne = styled.div`
  margin-bottom: 14px;
  padding: 0 0 0 1px;
  display: flex;
  align-items: flex-start;
`;
export const Covid19Snapshot = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  display: flex;
  margin-right: 20px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36ExtraBold.family};
  font-size: ${(props) => props.theme.fonts.nunito36ExtraBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito36ExtraBold.weight};
  line-height: 32px;
`;
export const CountryTxt = styled.p`
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 23px;
  margin-left: 1px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito24SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito24SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito24SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito24SemiBold.lineHeight};
`;
export const FlexWrapperTwo = styled.div`
  margin-bottom: 14px;
  padding: 0 0 0 1px;
  display: flex;
  align-items: center;
`;
export const RelativeWrapperThree = styled.div`
  position: relative;
  &:not(:last-of-type) {
    margin-right: 19px;
  }
`;
export const NewCases24 = styled.div`
  border-radius: 25px;
  padding: 32px 6px 12px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(
    321deg,
    ${(props) => props.theme.colors.dodgerBlue2} 25%,
    ${(props) => props.theme.colors.dodgerBlue4} 38%,
    ${(props) => props.theme.colors.dodgerBlue3} 51%,
    ${(props) => props.theme.colors.dodgerBlue} 61%
  );
  position: relative;
`;
export const Num24hrsLbl = styled.p`
  height: 19px;
  width: 125px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-bottom: 30px;
  margin-left: 2px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const DailyNum = styled.p`
  height: 21px;
  width: 127px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-bottom: 12px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36ExtraBold.family};
  font-size: ${(props) => props.theme.fonts.nunito36ExtraBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito36ExtraBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito36ExtraBold.lineHeight};
`;
export const DailyNumDiff = styled.p`
  height: 19px;
  width: 54px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-left: 17px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const Icons8Up1 = styled.img`
  position: absolute;
  left: 14px;
  bottom: 15px;
`;
export const WeeklyCases = styled.div`
  border-radius: 25px;
  padding: 31px 5px 30px 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(
    321deg,
    ${(props) => props.theme.colors.dodgerBlue2} 25%,
    ${(props) => props.theme.colors.dodgerBlue4} 38%,
    ${(props) => props.theme.colors.dodgerBlue3} 51%,
    ${(props) => props.theme.colors.dodgerBlue} 61%
  );
  position: relative;
`;
export const WeekLbl = styled.p`
  height: 37px;
  width: 118px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-bottom: 10px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const RelativeWrapperOne = styled.div`
  position: relative;
`;
export const WeekNum = styled.p`
  height: 37px;
  width: 127px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  position: relative;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36ExtraBold.family};
  font-size: ${(props) => props.theme.fonts.nunito36ExtraBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito36ExtraBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito36ExtraBold.lineHeight};
`;
export const WeekNumDiff = styled.p`
  height: 19px;
  width: 54px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  position: absolute;
  left: 17px;
  bottom: -17px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const Icons8Down1 = styled.img`
  position: absolute;
  left: 14px;
  bottom: 16px;
`;
export const RelativeWrapperFour = styled.div`
  margin-bottom: 15px;
  margin-left: 1px;
  position: relative;
`;
export const SourceTxt = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  position: relative;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const Icons8ExternalLink1 = styled.img``;
export const AdviceTxt = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-left: 1px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito24SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito24SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito24SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito24SemiBold.lineHeight};
  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;
export const AdviceContent = styled.p`
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 1px;
  margin-left: 1px;
  margin-right: 1px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
  display: inline;
  overflow-wrap: anywhere;
  max-width: 313px;
`;
export const AdviceSource = styled.p`
  max-width: 313px;
  display: inline;
  overflow-wrap: anywhere;
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-bottom: 16px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;

//modal
export const SnapshotModalContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 25px;
  padding: 41px 58px 53px 51px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    padding: 30px 40px 30px 40px;
  }
`;
export const WrapperOne = styled.div`
  margin-bottom: 14px;
  display: flex;
  align-items: flex-start;
`;
export const WrapperThree = styled.div`
  margin-right: 54px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const Covid19SnapshotModal = styled.p`
  height: 71px;
  width: 200px;
  color: ${(props) => props.theme.colors.darkSlateGray};
  display: flex;
  margin-top: 25px;
  margin-right: 20px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36ExtraBold.family};
  font-size: ${(props) => props.theme.fonts.nunito36ExtraBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito36ExtraBold.weight};
  line-height: 32px; ;
`;
export const CountryTxtModal = styled.p`
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 23px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito24SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito24SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito24SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito24SemiBold.lineHeight};
`;
export const WrapperSix = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 14px;
  }
`;
export const RWrapperFour = styled.div`
  position: relative;
  &:not(:last-of-type) {
    margin-right: 19px;
  }
`;
export const NewCases24Modal = styled.div`
  border-radius: 25px;
  padding: 32px 6px 12px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(
    321deg,
    ${(props) => props.theme.colors.dodgerBlue2} 25%,
    ${(props) => props.theme.colors.dodgerBlue4} 38%,
    ${(props) => props.theme.colors.dodgerBlue3} 51%,
    ${(props) => props.theme.colors.dodgerBlue} 61%
  );
  position: relative;
`;
export const Num24hrsLblModal = styled.p`
  height: 19px;
  width: 125px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-bottom: 30px;
  margin-left: 2px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const DailyNumModal = styled.p`
  height: 21px;
  width: 127px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-bottom: 12px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36ExtraBold.family};
  font-size: ${(props) => props.theme.fonts.nunito36ExtraBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito36ExtraBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito36ExtraBold.lineHeight};
`;
export const DailyNumDiffModal = styled.p`
  height: 19px;
  width: 54px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-left: 17px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const Icons8Up1Modal = styled.img`
  position: absolute;
  left: 14px;
  bottom: 15px;
`;
export const WeeklyCasesModal = styled.div`
  border-radius: 25px;
  padding: 31px 5px 30px 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(
    321deg,
    ${(props) => props.theme.colors.dodgerBlue2} 25%,
    ${(props) => props.theme.colors.dodgerBlue4} 38%,
    ${(props) => props.theme.colors.dodgerBlue3} 51%,
    ${(props) => props.theme.colors.dodgerBlue} 61%
  );
  position: relative;
`;
export const WeekLblModal = styled.p`
  height: 37px;
  width: 118px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-bottom: 10px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const RWrapperOne = styled.div`
  position: relative;
`;
export const WeekNumModal = styled.p`
  height: 37px;
  width: 127px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  position: relative;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36ExtraBold.family};
  font-size: ${(props) => props.theme.fonts.nunito36ExtraBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito36ExtraBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito36ExtraBold.lineHeight};
`;
export const WeekNumDiffModal = styled.p`
  height: 19px;
  width: 54px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  position: absolute;
  left: 17px;
  bottom: -17px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const Icons8Down1Modal = styled.img`
  position: absolute;
  left: 14px;
  bottom: 16px;
`;
export const RWrapperSix = styled.div`
  margin-bottom: 14px;
  position: relative;
`;
export const SourceTxtModal = styled.p`
  width: 286px;
  color: ${(props) => props.theme.colors.darkSlateGray};
  position: relative;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const Icons8ExternalLink1Modal = styled.img``;
export const NewCases25 = styled.div`
  margin-right: 19px;
  border-radius: 25px;
  padding: 45px 6px 25px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(
    321deg,
    ${(props) => props.theme.colors.dodgerBlue2} 25%,
    ${(props) => props.theme.colors.dodgerBlue4} 38%,
    ${(props) => props.theme.colors.dodgerBlue3} 51%,
    ${(props) => props.theme.colors.dodgerBlue} 61%
  );
`;
export const Num24hrsLblTwo = styled.p`
  height: 19px;
  width: 125px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-bottom: 9px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const DailyNumTwo = styled.p`
  height: 21px;
  width: 127px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  margin-bottom: 7px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36ExtraBold.family};
  font-size: ${(props) => props.theme.fonts.nunito36ExtraBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito36ExtraBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito36ExtraBold.lineHeight};
`;
export const DailyNumDiffTwo = styled.p`
  height: 19px;
  width: 116px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const WeeklyCasesTwo = styled.div`
  border-radius: 25px;
  padding: 44px 8px 39px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    321deg,
    ${(props) => props.theme.colors.dodgerBlue2} 25%,
    ${(props) => props.theme.colors.dodgerBlue4} 38%,
    ${(props) => props.theme.colors.dodgerBlue3} 51%,
    ${(props) => props.theme.colors.dodgerBlue} 61%
  );
`;
export const WeekLblTwo = styled.p`
  height: 25px;
  width: 118px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const WeekNumDiffTwo = styled.p`
  height: 19px;
  width: 117px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  position: absolute;
  left: 4px;
  bottom: -13px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito13SemiBold.lineHeight};
`;
export const WrapperFour = styled.div`
  padding: 16px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const AdviceTxtModal = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-bottom: 10px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito24SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito24SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito24SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito24SemiBold.lineHeight};
`;
export const Image4 = styled.img`
  margin-bottom: 10px;
`;
export const AdviceTxtTwo = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-bottom: 7px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito24SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito24SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito24SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito24SemiBold.lineHeight};
`;
export const RWrapperFive = styled.div`
  position: relative;
  margin-bottom: 7px;
`;
export const AdviceContentModal = styled.p`
  width: 100%;
  color: ${(props) => props.theme.colors.gray};
  display: flex;
  position: relative;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
`;
export const AdviceSourceModal = styled.p`
  width: 631px;
  color: ${(props) => props.theme.colors.darkSlateGray};
  position: absolute;
  left: 0;
  bottom: -7px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const WrapperTwo = styled.div`
  display: flex;
  align-items: center;
`;
export const RWrapperSeven = styled.div`
  margin-right: 88px;
  position: relative;
`;
export const UpdateDate = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito24SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito24SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito24SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito24SemiBold.lineHeight};
`;

const containerStyles = {
  width: "1100px",
};
const StyledCard = styled(Card)`
  margin-bottom: 10px;
`;

export const Link = tw.a`
  text-lg my-2 lg:text-sm  lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hocus:text-primary-500
`;

const Placeholder = tw(
  SectionHeading
)`mt-4  text-left text-3xl sm:text-4xl lg:text-5xl text-center  leading-tight`;

const SnapshotComponent = (props) => {
  const date = getYYYYMMDD(new Date());
  const code = props.code;
  const [data, setData] = useState("");
  const [cases, setCases] = useState("");
  const [diffs, setDiffs] = useState("");
  const [lockdowns, setLockdowns] = useState("");

  //const [imgLink, setImgLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  //const [clicked, setClicked] = useState(false);

  const openLink = (e) => {
    e.stopPropagation();
    window.open("https://covid19.who.int/table");
  };

  const openWiki = (e) => {
    e.stopPropagation();
    window.open(
      "https://en.wikipedia.org/wiki/COVID-19_lockdowns#Table_of_pandemic_lockdowns"
    );
  };

  const openModal = () => {
    //console.log(isOpen);
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const minimise = (text) => {
    //console.log(text && text.length);
    if (text && text.length > 170) {
      //setMore(true);
      return text.slice(0, 170);
    }
    return text;
    //return  &&  + "...read more";
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .all([
          axios.get(
            `https://3tmuo3iuhk.execute-api.eu-west-2.amazonaws.com/dev?code=${code}&date=${date}`
          ),
          axios.get(
            `https://hmbrr2y0jg.execute-api.eu-west-2.amazonaws.com/dev?code=${code}&date=${date}`
          ),
          axios.get(
            `https://0glnns5f5h.execute-api.eu-west-2.amazonaws.com/dev?code=${code}&date=${date}`
          ),
        ])
        .then((response) => {
          setData(response[0].data.body.Item);
          setCases(
            response[1].data.body
              ? response[1].data.body.Item.Item
              : {
                  dailyCases: "N/A",
                  rate: "N/A",
                }
          );
          setDiffs(
            response[1].data.body
              ? response[1].data.body
              : {
                  casesDiff: "N/A",
                  rateDiff: "N/A",
                }
          );
          setLockdowns(response[2].data.body.Item);
        })
        .catch((err) => {
          if (err.response) {
            setData("N/A");
            setCases({ dailyCases: "N/A", rate: "N/A" });
            setDiffs("N/A");
            setLockdowns("N/A");
          }
        });
    };
    code !== "" && code !== "-99" && fetchData();
  }, [code, date]);

  return (
    <div>
      <StyledCard>
        {code === "" ? (
          <div style={{ width: "100%", height: "690px" }}>
            <Placeholder>
              Click on a country to view it's COVID-19 Snapshot
            </Placeholder>
            <img src={SnapPlaceholder} alt="placeholder" />
          </div>
        ) : (
          <Snapshot onClick={openModal}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              spacing={1}
            >
              <Grid item xs={12}>
                <FlexWrapperOne>
                  <Covid19Snapshot>
                    COVID-19 <br />
                    Snapshot
                    <Disclaimer />
                  </Covid19Snapshot>
                  <img
                    src={`https://hatscripts.github.io/circle-flags/flags/${code.toLowerCase()}.svg`}
                    width="78"
                    alt="country flag"
                  ></img>
                </FlexWrapperOne>
                <CountryTxt>{data.country}</CountryTxt>
              </Grid>
              <Hidden xsDown>
                <Grid item xs={12}>
                  <FlexWrapperTwo>
                    <RelativeWrapperThree>
                      <NewCases24>
                        <Num24hrsLbl>
                          New cases in the last 24 hours
                        </Num24hrsLbl>
                        <DailyNum>{cases.dailyCases}</DailyNum>
                        <DailyNumDiff>{diffs.casesDiff}</DailyNumDiff>
                      </NewCases24>
                      {diffs.casesDiffInd === "up" ? (
                        <Icons8Up1 alt="up" src={up_icon} />
                      ) : (
                        <Icons8Down1 alt="down" src={down_icon} />
                      )}
                    </RelativeWrapperThree>
                    <RelativeWrapperThree>
                      <WeeklyCases>
                        <WeekLbl>Weekly rate of new cases/100k</WeekLbl>
                        <RelativeWrapperOne>
                          <WeekNum>{cases.rate}</WeekNum>
                          <WeekNumDiff>{diffs.rateDiff}</WeekNumDiff>
                        </RelativeWrapperOne>
                      </WeeklyCases>
                      {diffs.rateDiffInd === "up" ? (
                        <Icons8Up1 alt="" src={up_icon} />
                      ) : (
                        <Icons8Down1 alt="down" src={down_icon} />
                      )}
                    </RelativeWrapperThree>
                  </FlexWrapperTwo>
                  <Grid container>
                    <Grid item>
                      <Link onClick={openLink}>
                        Source: World Health Organisation (WHO)
                      </Link>
                    </Grid>
                    <Grid item>
                      <Icons8ExternalLink1
                        onClick={openLink}
                        alt=""
                        src={external_link_icon}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <AdviceTxt>Travel Advice:</AdviceTxt>
                  <AdviceContent>{minimise(data.info)}</AdviceContent>
                  <Link onClick={openModal}>...Read More</Link>
                  <table>
                    <tbody>
                      <tr>
                        <th>Source(s):</th>
                      </tr>
                      {data.links
                        ? data.links.map((link, index) => (
                            <tr
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(link, "_blank");
                              }}
                            >
                              <td>
                                <Link>External Link {index + 1}</Link>
                              </td>
                              <td>
                                <img
                                  alt="external"
                                  src={external_link_icon}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(link, "_blank");
                                  }}
                                />
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                  <AdviceTxt>Last updated: {data.date}</AdviceTxt>
                </Grid>
              </Hidden>
            </Grid>
          </Snapshot>
        )}
      </StyledCard>
      <Modal
        id="modal-1"
        isOpen={isOpen}
        style={containerStyles}
        onRequestClose={handleOnClose}
      >
        <SnapshotModalContainer>
          <Grid container justify="flex-start" alignItems="stretch" spacing={1}>
            <Grid item xs={12} md={6}>
              <Grid item xs={12}>
                <WrapperOne>
                  <Covid19SnapshotModal>
                    COVID-19 <br />
                    Snapshot
                    <Disclaimer />
                  </Covid19SnapshotModal>
                  <img
                    src={`https://hatscripts.github.io/circle-flags/flags/${code.toLowerCase()}.svg`}
                    width="78"
                    alt="country flag"
                  ></img>
                </WrapperOne>
                <CountryTxtModal>{data.country}</CountryTxtModal>
              </Grid>
              <Grid item xs={12}>
                <WrapperSix>
                  <RWrapperFour>
                    <NewCases24Modal>
                      <Num24hrsLblModal>
                        New cases in the last 24 hours
                      </Num24hrsLblModal>
                      <DailyNumModal>{cases.dailyCases}</DailyNumModal>
                      <DailyNumDiffModal>{diffs.casesDiff}</DailyNumDiffModal>
                    </NewCases24Modal>
                    {diffs.casesDiffInd === "up" ? (
                      <Icons8Up1Modal alt="up" src={up_icon} />
                    ) : (
                      <Icons8Down1Modal alt="down" src={down_icon} />
                    )}
                  </RWrapperFour>
                  <RWrapperFour>
                    <WeeklyCasesModal>
                      <WeekLblModal>Weekly rate of new cases/100k</WeekLblModal>
                      <RWrapperOne>
                        <WeekNumModal>{cases.rate}</WeekNumModal>
                        <WeekNumDiffModal>{diffs.rateDiff}</WeekNumDiffModal>
                      </RWrapperOne>
                    </WeeklyCasesModal>
                    {diffs.rateDiffInd === "up" ? (
                      <Icons8Up1Modal alt="up" src={up_icon} />
                    ) : (
                      <Icons8Down1Modal alt="down" src={down_icon} />
                    )}
                  </RWrapperFour>
                </WrapperSix>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link onClick={openLink}>
                    Source: World Health Organisation (WHO)
                  </Link>
                </Grid>
                <Grid item>
                  <Icons8ExternalLink1Modal
                    onClick={openLink}
                    alt="external"
                    src={external_link_icon}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <WrapperSix>
                  <NewCases25>
                    <Num24hrsLblTwo>Lockdown Status</Num24hrsLblTwo>
                    <DailyNumTwo>{lockdowns.fact}</DailyNumTwo>
                    <DailyNumDiffTwo>
                      Ending: {lockdowns.lockdownEndDate}
                    </DailyNumDiffTwo>
                  </NewCases25>
                  <WeeklyCasesTwo>
                    <WeekLblTwo>Quarantine Status</WeekLblTwo>
                    <RWrapperOne>
                      <WeekNum>Maybe</WeekNum>
                      <WeekNumDiffTwo>
                        See Travel Advice for more info
                      </WeekNumDiffTwo>
                    </RWrapperOne>
                  </WeeklyCasesTwo>
                </WrapperSix>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link onClick={openWiki}>Source: Wikipedia</Link>
                </Grid>
                <Grid item>
                  <Icons8ExternalLink1Modal
                    onClick={openWiki}
                    alt="external"
                    src={external_link_icon}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid item xs={12}>
                <WrapperFour>
                  <AdviceTxtModal>7 day history</AdviceTxtModal>
                  <Image4
                    alt=""
                    src="https://static.overlay-tech.com/assets/b0d23f1f-2f26-4a19-a346-7f5a145292f9.png"
                  />

                  <AdviceTxtTwo>Travel Advice:</AdviceTxtTwo>
                  <RWrapperFive>
                    <AdviceContentModal>{data.info}</AdviceContentModal>
                    <table>
                      <tbody>
                        <tr>
                          <td>Source(s):</td>
                        </tr>
                        {data.links
                          ? data.links.map((link, index) => (
                              <tr
                                key={index}
                                onClick={() => window.open(link, "_blank")}
                              >
                                <td>
                                  <Link>External Link {index + 1}</Link>
                                </td>
                                <td>
                                  <img
                                    alt="external"
                                    src={external_link_icon}
                                    onClick={() => window.open(link, "_blank")}
                                  />
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </RWrapperFive>
                </WrapperFour>
              </Grid>
              <Grid item xs={12}>
                <UpdateDate>Last updated: {data.date}</UpdateDate>
              </Grid>
            </Grid>
          </Grid>
        </SnapshotModalContainer>
      </Modal>
    </div>
  );
};

export default SnapshotComponent;
