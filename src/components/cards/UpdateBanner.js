import React from "react";
import styled from "styled-components";
import UpdateMan from "images/update-man.svg";

export const UpdateBannerContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 25px;
  padding: 41px 89px 49px 385px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid ${(props) => props.theme.colors.gainsboro};
`;
export const RelativeWrapperOne = styled.div`
  margin-bottom: 26px;
  position: relative;
`;
export const Title = styled.p`
  height: 68px;
  width: 614px;
  color: ${(props) => props.theme.colors.darkSlateGray};
  display: flex;
  position: relative;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito36BoldLine56.family};
  font-size: ${(props) => props.theme.fonts.nunito36BoldLine56.size};
  font-weight: ${(props) => props.theme.fonts.nunito36BoldLine56.weight};
  line-height: ${(props) => props.theme.fonts.nunito36BoldLine56.lineHeight};
`;
export const Subtitle = styled.p`
  width: 694px;
  color: ${(props) => props.theme.colors.lightSlateGray};
  position: absolute;
  right: -81px;
  bottom: -7px;
  letter-spacing: 0.3px;
  font-family: ${(props) => props.theme.fonts.nunito14Regular.family};
  font-size: ${(props) => props.theme.fonts.nunito14Regular.size};
  font-weight: ${(props) => props.theme.fonts.nunito14Regular.weight};
  line-height: ${(props) => props.theme.fonts.nunito14Regular.lineHeight};
`;
export const FlexWrapperOne = styled.div`
  margin-bottom: 14px;
  padding: 0 0 0 1px;
  display: flex;
  align-items: center;
`;
export const EmailBox = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin-right: 14px;
  border-radius: 10px;
  padding: 23px 113px 23px 28px;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.darkSlateGray};
`;
export const EmailTxt = styled.p`
  color: ${(props) => props.theme.colors.lightSlateGray};
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
`;
export const DestBox = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin-right: 14px;
  border-radius: 10px;
  padding: 23px 104px 23px 28px;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.darkSlateGray};
`;
export const SignUpBtn = styled.div`
  border-radius: 10px;
  padding: 24px 58px 24px 67px;
  display: flex;
  align-items: center;
  background: linear-gradient(
    291deg,
    ${(props) => props.theme.colors.dodgerBlue2} 22%,
    ${(props) => props.theme.colors.dodgerBlue3} 39%,
    ${(props) => props.theme.colors.dodgerBlue} 49%
  );
`;
export const SignUpBtnTxt = styled.p`
  color: ${(props) => props.theme.colors.white};
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
  font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
  font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
  line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
`;
export const DisclaimerTxt = styled.p`
  max-width: 685px;
  color: ${(props) => props.theme.colors.gray};
  margin-left: 2px;
  letter-spacing: 0.2px;
  font-family: ${(props) => props.theme.fonts.nunito12Regular.family};
  font-size: ${(props) => props.theme.fonts.nunito12Regular.size};
  font-weight: ${(props) => props.theme.fonts.nunito12Regular.weight};
  line-height: ${(props) => props.theme.fonts.nunito12Regular.lineHeight};
`;

const UpdateBanner = () => {
  return (
    <UpdateBannerContainer>
      <img alt="update" src={UpdateMan} />
      <RelativeWrapperOne>
        <Title>Busy? Sign up for updates and relax.</Title>
        <Subtitle>
          Get the latest COVID-19 travel advice and price updates for the
          destination you want to travel to.
        </Subtitle>
      </RelativeWrapperOne>
      <FlexWrapperOne>
        <EmailBox>
          <EmailTxt>Your email</EmailTxt>
        </EmailBox>
        <DestBox>
          <EmailTxt>Destination</EmailTxt>
        </DestBox>
        <SignUpBtn>
          <SignUpBtnTxt>Sign up now</SignUpBtnTxt>
        </SignUpBtn>
      </FlexWrapperOne>
      <DisclaimerTxt>
        By clicking “Primary action” you accepting ipsum dolor sit amet, sit ea
        brute mediocritatem, eu sed aliquam scripserit dissentiunt.
      </DisclaimerTxt>
    </UpdateBannerContainer>
  );
};

export default UpdateBanner;
