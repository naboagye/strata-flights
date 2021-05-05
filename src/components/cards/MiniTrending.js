import React, { useState, useEffect } from "react";
import axios from "axios";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as TrendingIcon } from "feather-icons/dist/icons/trending-up.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import { getDDMMYYYYAPI } from "helpers/DurationConverter";
import Skeleton from "@material-ui/lab/Skeleton";
import Snap from "components/cards/Snap.js";
import { Drawer } from "react-rainbow-components";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const ThreeColumn = tw.div`flex flex-wrap`;
const Column = tw.div``;
const HeadingColumn = tw(Column)`w-full xl:w-1/3`;
const CardColumn = tw(Column)`w-full md:w-1/2 xl:w-1/3 mt-16 xl:mt-0`;

const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`xl:text-left leading-tight`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-8`;
const PrimaryLink = styled(PrimaryLinkBase)`
  ${tw`inline-flex justify-center xl:justify-start items-center mt-8 text-lg`}
  svg {
    ${tw`ml-2 w-5 h-5`}
  }
`;

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-80 bg-cover bg-center rounded`,
]);

const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardType = tw.div`text-primary-500 font-bold text-lg`;
const CardPrice = tw.div`font-semibold text-sm text-gray-600`;
const CardPriceAmount = tw.span`font-bold text-gray-800 text-lg`;

const CardTitle = tw.h5`text-xl mt-4 font-bold`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-between sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;
const CardAction = tw(PrimaryButtonBase)`w-full mt-8`;

export default () => {
  const [locations, setLocations] = useState([]);
  const [prices, setPrices] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");

  function getAbbreviation(text) {
    if (typeof text != "string" || !text) {
      return "";
    }
    const acronym = text
      .match(/[\p{Alpha}\p{Nd}]+/gu)
      .reduce(
        (previous, next) =>
          previous +
          (+next === 0 || parseInt(next) ? parseInt(next) : next[0] || ""),
        ""
      )
      .toUpperCase();
    return acronym;
  }

  useEffect(() => {
    const date = getDDMMYYYYAPI(new Date());
    const fetchLocations = async () => {
      await axios
        .get(
          `https://xtogjhen60.execute-api.eu-west-2.amazonaws.com/dev/locations/topdestinations?term=london_gb&locale=en-US&limit=2&sort=name&active_only=true&source_popularity=bookings`
        )
        .then((response) => {
          return response.data.locations;
        })
        .then((locs) => {
          locs.forEach((obj) => {
            Promise.all([
              axios.get(
                `https://xtogjhen60.execute-api.eu-west-2.amazonaws.com/dev/aggregation_search/price_per_city?fly_from=LON&fly_to=${obj.code}&date_from=${date}&date_to=${date}&max_fly_duration=20&flight_type=round&adults=1&curr=GBP&limit=30`
              ),
              axios.get(
                `https://nqtf2qcede.execute-api.eu-west-2.amazonaws.com/dev/search/photos?query=${obj.name}`
              ),
            ])
              .then((response) => {
                const first_key = Object.keys(response[0].data.data)[0];
                setLocations((current) => [...current, obj]);
                setPrices((current) => [
                  ...current,
                  response[0].data.data[first_key],
                ]);
                setImages((current) => [
                  ...current,
                  response[1].data.results[0].urls.raw,
                ]);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                return Promise.reject(err);
              });
          });
        });
    };
    fetchLocations();
  }, []);

  return (
    <Container>
      <Content>
        <ThreeColumn>
          <HeadingColumn>
            <HeadingInfoContainer>
              <HeadingTitle>Need some help deciding where to go?</HeadingTitle>
              <HeadingDescription>
                Ideas on destinations you can travel to from the United Kingdom
              </HeadingDescription>
              <PrimaryLink href="/travel-ideas">
                View All Destinations <ArrowRightIcon />
              </PrimaryLink>
            </HeadingInfoContainer>
          </HeadingColumn>
          {(isLoading ? Array.from(new Array(12)) : locations).map(
            (location, index) => (
              <CardColumn key={index}>
                <Card>
                  {location ? (
                    <CardImage
                      imageSrc={`${images[index]}&auto=format&fit=crop&w=768&q=80`}
                    />
                  ) : (
                    <Skeleton variant="rect" width={300} height={300} />
                  )}
                  {location ? (
                    <CardText>
                      <CardHeader>
                        <CardType>{location.tags[1].tag}</CardType>
                        <CardPrice>
                          <CardPriceAmount>
                            from £{prices[index]}
                          </CardPriceAmount>
                        </CardPrice>
                      </CardHeader>
                      <CardTitle>{location.name}</CardTitle>
                      <CardMeta>
                        <CardMetaFeature>
                          <TrendingIcon /> {"Trending"}
                        </CardMetaFeature>
                        <CardMetaFeature>
                          <TimeIcon /> {"7 days"}
                        </CardMetaFeature>
                        <CardMetaFeature>
                          <LocationIcon />{" "}
                          {location.country.name.length > 13
                            ? getAbbreviation(location.country.name)
                            : location.country.name}
                        </CardMetaFeature>
                      </CardMeta>
                      <CardAction
                        onClick={() => {
                          setIsOpen(true);
                          setCode(location.country.id);
                        }}
                      >
                        View Snapshot
                      </CardAction>
                    </CardText>
                  ) : (
                    <CardText>
                      <Skeleton width="100%" />
                    </CardText>
                  )}
                </Card>
              </CardColumn>
            )
          )}
        </ThreeColumn>
        <Drawer
          id="drawer-1"
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <Snap code={code} />
        </Drawer>
      </Content>
    </Container>
  );
};
