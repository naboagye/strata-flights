import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Drawer, Modal } from "react-rainbow-components";
import axios from "axios";
import { getYYYYMMDD } from "helpers/DurationConverter";

export const SnapshotModalContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 25px;
  padding: 41px 58px 53px 51px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const FlexWrapperOne = styled.div`
  margin-bottom: 14px;
  display: flex;
  align-items: flex-start;
`;
export const FlexWrapperThree = styled.div`
  margin-right: 54px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const Covid19Snapshot = styled.p`
  height: 71px;
  width: 186px;
  color: ${(props) => props.theme.colors.darkSlateGray};
  display: flex;
  margin-top: 25px;
  margin-right: 20px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36ExtraBold.family};
  font-size: ${(props) => props.theme.fonts.nunito36ExtraBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito36ExtraBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito36ExtraBold.lineHeight};
`;
export const CountryTxt = styled.p`
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 23px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito24SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito24SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito24SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito24SemiBold.lineHeight};
`;
export const FlexWrapperSix = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 14px;
  }
`;
export const RelativeWrapperFour = styled.div`
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
export const RelativeWrapperSix = styled.div`
  margin-bottom: 14px;
  position: relative;
`;
export const SourceTxt = styled.p`
  width: 286px;
  color: ${(props) => props.theme.colors.darkSlateGray};
  position: relative;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito14SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito14SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito14SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito14SemiBold.lineHeight};
`;
export const Icons8ExternalLink1 = styled.img`
  position: absolute;
  right: -23px;
  top: -4px;
`;
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
export const FlexWrapperFour = styled.div`
  padding: 16px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const AdviceTxt = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-bottom: 10px;
  margin-left: 11px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito24SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito24SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito24SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito24SemiBold.lineHeight};
`;
export const Image4 = styled.img`
  margin-bottom: 2px;
`;
export const AdviceTxtTwo = styled.p`
  color: ${(props) => props.theme.colors.darkSlateGray};
  margin-bottom: 7px;
  margin-left: 10px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito24SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito24SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito24SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito24SemiBold.lineHeight};
`;
export const RelativeWrapperFive = styled.div`
  margin-left: 11px;
  position: relative;
`;
export const AdviceContent = styled.p`
  height: 213px;
  width: 651px;
  color: ${(props) => props.theme.colors.gray};
  display: flex;
  position: relative;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
`;
export const AdviceSource = styled.p`
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
export const FlexWrapperTwo = styled.div`
  display: flex;
  align-items: center;
`;
export const RelativeWrapperSeven = styled.div`
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

const SnapDrawer = ({ code, open }) => {
  const date = getYYYYMMDD(new Date());
  const [data, setData] = useState("");
  const [cases, setCases] = useState("");
  const [diffs, setDiffs] = useState("");
  const [lockdowns, setLockdowns] = useState("");
  const [more, setMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [closed, setClosed] = useState(false);

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

  const handleClose = () => {
    setClosed(true);
  };

  useEffect(() => {
    console.log(open);
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setIsOpen(false);
  }, [closed]);

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

  //   function submit(keyword) {
  //     if (typeof props.search === "function") {
  //       props.search(keyword);
  //     }
  //     //console.log(keyword);
  //   }

  return (
    <Drawer
      id="drawer-1"
      isOpen={isOpen}
      style={containerStyles}
      onRequestClose={handleClose}
    >
      <SnapshotModalContainer>
        <FlexWrapperOne>
          <FlexWrapperThree>
            <FlexWrapperOne>
              <Covid19Snapshot>
                COVID-19 <br />
                Snapshot
              </Covid19Snapshot>
              <img
                alt=""
                src="https://static.overlay-tech.com/assets/de7cf91f-4705-40c0-9eae-c1564bfdd451.png"
              />
            </FlexWrapperOne>
            <CountryTxt>United States of America</CountryTxt>
            <FlexWrapperSix>
              <RelativeWrapperFour>
                <NewCases24>
                  <Num24hrsLbl>New cases in the last 24 hours</Num24hrsLbl>
                  <DailyNum>61,620</DailyNum>
                  <DailyNumDiff>12,329</DailyNumDiff>
                </NewCases24>
                <Icons8Up1
                  alt=""
                  src="https://static.overlay-tech.com/assets/f78bafcc-3d46-4ffa-b8e7-a1ddca21c1ee.png"
                />
              </RelativeWrapperFour>
              <RelativeWrapperFour>
                <WeeklyCases>
                  <WeekLbl>Weekly rate of new cases/100k</WeekLbl>
                  <RelativeWrapperOne>
                    <WeekNum>131.49</WeekNum>
                    <WeekNumDiff>5.32</WeekNumDiff>
                  </RelativeWrapperOne>
                </WeeklyCases>
                <Icons8Down1
                  alt=""
                  src="https://static.overlay-tech.com/assets/c93aa035-a6b6-4c47-adbd-0873ce10f644.png"
                />
              </RelativeWrapperFour>
            </FlexWrapperSix>
            <RelativeWrapperSix>
              <SourceTxt>Source: World Health Organisation (WHO)</SourceTxt>
              <Icons8ExternalLink1
                alt=""
                src="https://static.overlay-tech.com/assets/a50127af-2736-4735-bcb8-e3109e0693df.png"
              />
            </RelativeWrapperSix>
            <FlexWrapperSix>
              <NewCases25>
                <Num24hrsLblTwo>Lockdown Status</Num24hrsLblTwo>
                <DailyNumTwo>Yes</DailyNumTwo>
                <DailyNumDiffTwo>Ending: 05/05/21</DailyNumDiffTwo>
              </NewCases25>
              <WeeklyCasesTwo>
                <WeekLblTwo>Quarantine Status</WeekLblTwo>
                <RelativeWrapperOne>
                  <WeekNum>Maybe</WeekNum>
                  <WeekNumDiffTwo>
                    See Travel Advice for more info
                  </WeekNumDiffTwo>
                </RelativeWrapperOne>
              </WeeklyCasesTwo>
            </FlexWrapperSix>
          </FlexWrapperThree>
          <FlexWrapperFour>
            <AdviceTxt>7 day history</AdviceTxt>
            <Image4
              alt=""
              src="https://static.overlay-tech.com/assets/b0d23f1f-2f26-4a19-a346-7f5a145292f9.png"
            />
            <AdviceTxtTwo>Travel Advice:</AdviceTxtTwo>
            <RelativeWrapperFive>
              <AdviceContent>
                There is still a ban in the following countries China, Iran,
                Most European Countries, UK, Ireland, Brazil and South Africa.
                All travelers (including US citizens and transit passenger) must
                present a negative COVID-19 viral or antigen test result issued
                72 hours prior...There is still a ban in the following countries
                China, Iran, Most European Countries, UK, Ireland, Brazil and
                South Africa. All travelers (including US citizens and transit
                passenger) must present a negative COVID-19 viral or antigen
                test result issued 72 hours prior...There is still a ban in the
                following countries China, Iran, Most European Countries, UK,
                Ireland, Brazil and South Africa. All travelers (including US
                citizens and transit passenger) must present a negative COVID-19
                viral or antigen test result issued 72 hours prior...
              </AdviceContent>
              <AdviceSource>
                Source:http://web.archive.org/web/20210209025559/https://www.kayak.com/travel-restrictions
              </AdviceSource>
            </RelativeWrapperFive>
          </FlexWrapperFour>
        </FlexWrapperOne>
        <FlexWrapperTwo>
          <RelativeWrapperSeven>
            <SourceTxt>Source: World Health Organisation (WHO)</SourceTxt>
            <Icons8ExternalLink1
              alt=""
              src="https://static.overlay-tech.com/assets/99c06795-ccef-4c61-9e10-bb0d79ded546.png"
            />
          </RelativeWrapperSeven>
          <UpdateDate>Last updated: Fri, Apr 2</UpdateDate>
        </FlexWrapperTwo>
      </SnapshotModalContainer>
    </Drawer>
  );
};

export default SnapDrawer;
