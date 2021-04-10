import React, { useState, useEffect } from "react";
import { Card } from "react-rainbow-components";
import styled from "styled-components";
import axios from "axios";

const Title = styled.h1.attrs((props) => props.theme.rainbow)`
  font-family: "Lato Light";
  font-size: 32px;
  text-align: center;
  color: black;
`;

const Subtitle = styled.h2`
  font-family: "Lato Light";
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: black;
  ${(props) => props.uppercase && "text-transform: uppercase;"}
`;

const BigPriceText = styled.h2`
  font-family: "Lato Black";
  font-size: 56px;
  line-height: 56px;
  color: black;
`;

const NormalPriceText = styled.h3`
  font-family: Lato;
  font-size: 20px;
  font-weight: 500;
  color: black;
  ${(props) => props.alignEnd && "align-self: flex-end"}
`;

const OutputText = styled.h5`
  font-family: ${(props) => (props.bold ? "Lato Bold" : "Lato Light")};
  font-size: 15px;
  letter-spacing: 0.5px;
  display: inline;
  color: black;
`;

const StyledCard = styled(Card)``;

export default function SnapshotCard(props) {
  //const date = getYYYYMMDD(new Date());
  const date = "2021-04-02";
  const code = props.code;
  const [data, setData] = useState("");
  const [cases, setCases] = useState("");
  const [imgLink, setImgLink] = useState("");
  const fetchData = async () => {
    const response = await axios
      .all([
        axios.get(
          `https://3tmuo3iuhk.execute-api.eu-west-2.amazonaws.com/dev?code=${code}&date=${date}`
        ),
        axios.get(
          `https://hmbrr2y0jg.execute-api.eu-west-2.amazonaws.com/dev?code=${code}&date=${date}`
        ),
        axios.get(`https://restcountries.eu/rest/v2/alpha/${code}?fields=flag`),
      ])
      .then((response) => {
        setData(response[0].data.body.Item);
        setCases(response[1].data.body.Item.Item);
        setImgLink(response[2].data.flag);
      });
  };

  useEffect(() => {
    //setCode(props.code);
    fetchData();
    console.log("travel info");
  }, [props.code]);

  return (
    <StyledCard className="rainbow-flex rainbow-flex_column rainbow-align_center rainbow-justify_space-around rainbow-p-vertical_small rainbow-m-around_small">
      <Subtitle uppercase>COVID-19 Snapshot</Subtitle>
      <div className="rainbow-flex rainbow-m-bottom_xsmall">
        <BigPriceText>{data.country}</BigPriceText>
      </div>
      <img src={imgLink} alt="country flag" />
      <OutputText>Travel Info: {data.info}</OutputText>
      <OutputText>Date: {data.date}</OutputText>
      <OutputText>Cases: {cases.dailyCases}</OutputText>
      <OutputText>Rate: {cases.rate}</OutputText>
    </StyledCard>
  );
}
