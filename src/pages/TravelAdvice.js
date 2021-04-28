import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import TravelMap from "pages/TravelMap.js";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { Card, Spinner } from "react-rainbow-components";
import Snap from "components/cards/Snap.js";
import SortMap from "components/forms/SortMap.js";
import tw from "twin.macro";
import Toggle from "components/forms/Toggle";
import axios from "axios";
import { getYYYYMMDD } from "helpers/DurationConverter";
import { SectionHeading as HeadingTitle } from "components/misc/Headings.js";

const StyledCard = styled(Card)``;

const LeftColumn = tw.div`relative lg:w-9/12 lg:pr-6 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col`;
const TwoColumn = tw.div`flex flex-col lg:flex-row  max-w-screen-xl mx-auto py-5 `;
//const Column = tw.div`relative w-full max-w-screen-xl mx-auto pt-20 `;
const Container = tw.div`relative`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center `;

export default () => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [sort, setSort] = useState("");
  const [lockdown, setLockdown] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const date = getYYYYMMDD(new Date());
  //console.log(content);
  function getCode(code) {
    setCode(code);
  }

  function getSort(term) {
    setSort(term);
  }

  function getLockdown(lockdown) {
    setLockdown(lockdown);
  }

  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  useEffect(() => {
    // json(`/cases.json`).then((data) => {
    //   setData(data.body);
    // });
    //setLoading(isLoading);
    const fetchData = async () => {
      await axios
        .get(
          `https://vd593iw6ta.execute-api.eu-west-2.amazonaws.com/dev?date=${date}`
        )
        .then((response) => {
          setData(response.data.body);
          setLoading(false);
        });
    };
    fetchData();
  }, [date]);

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <HeadingInfoContainer>
          <HeadingTitle>Travel Advice</HeadingTitle>
          <HeadingDescription>
            Use our interactive map to take a closer look at the latest on
            COVID-19 around the globe.
          </HeadingDescription>
          <SortMap search={getSort} />
          <Toggle search={getLockdown} />
        </HeadingInfoContainer>
        <TwoColumn>
          <LeftColumn>
            <StyledCard>
              {isLoading ? (
                <div style={{ width: "100%", height: "700px" }}>
                  <Spinner variant="brand" size="large" />
                </div>
              ) : (
                <div>
                  <TravelMap
                    setTooltipContent={setContent}
                    getCode={getCode}
                    sort={sort}
                    lockdown={lockdown}
                    data={data}
                  />
                  <ReactTooltip>{content}</ReactTooltip>
                </div>
              )}
            </StyledCard>
          </LeftColumn>
          <RightColumn>
            <Snap code={code} />
          </RightColumn>
        </TwoColumn>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
