import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import TrendingCard from "components/cards/FullTrending.js";
import { Modal } from "react-rainbow-components";
import { getYYYYMMDD } from "helpers/DurationConverter";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "components/misc/Headings.js";
import axios from "axios";

const HeadingInfoContainer = tw.div`flex flex-col items-center mt-12`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center `;
const link =
  "https://www.gov.uk/guidance/transport-measures-to-protect-the-uk-from-variant-strains-of-covid-19#red-list-travel-ban-countries";

export const Link = tw.a`
  text-lg my-2 lg:text-sm  lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hocus:text-primary-500
`;

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [redlist, setRedList] = useState([]);
  const [codes, setCodes] = useState([]);
  const date = getYYYYMMDD(new Date());

  useEffect(() => {
    axios
      .get(
        `https://88gaxc0vg4.execute-api.eu-west-2.amazonaws.com/dev?date=${date}`
      )
      .then((response) => {
        setRedList(response.data.body.countries);
        setCodes(response.data.body.codes);
      });
  }, [date]);

  const listItems = redlist.map((code, index) => <li key={index}>{code}</li>);

  return (
    <AnimationRevealPage>
      <Header />
      <HeadingInfoContainer>
        <HeadingTitle>Need some help deciding where to go?</HeadingTitle>
        <HeadingDescription>
          Ideas on destinations you can travel to from the United Kingdom.
        </HeadingDescription>
        <Link onClick={() => setIsOpen(true)}>View Red List Countries</Link>
      </HeadingInfoContainer>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title={`Red List Countries (as of ${date})`}
        footer={
          <Link
            onClick={(e) => {
              e.stopPropagation();
              window.open(link, "_blank");
            }}
          >
            Source: {link}
          </Link>
        }
      >
        <ul>{listItems}</ul>
      </Modal>
      <TrendingCard codes={codes} />
      <Footer />
    </AnimationRevealPage>
  );
};
