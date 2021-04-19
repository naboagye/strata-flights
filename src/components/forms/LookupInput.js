/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { matchSorter } from "match-sorter";

// const FromBox = styled.div`
//   background-color: ${(props) => props.theme.colors.white};
//   border-radius: 10px;
//   position: relative;
//   border: 1px solid ${(props) => props.theme.colors.gainsboro};
//   padding: 23px 23px 23px 29px;
// `;

// const FromLbl = styled.input`
//   font-family: ${(props) => props.theme.fonts.nunito18SemiBold.family};
//   font-size: ${(props) => props.theme.fonts.nunito18SemiBold.size};
//   font-weight: ${(props) => props.theme.fonts.nunito18SemiBold.weight};
//   line-height: ${(props) => props.theme.fonts.nunito18SemiBold.lineHeight};
//   color: ${(props) => props.theme.colors.darkSlateGray};
//   letter-spacing: 0.2px;
// `;
const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export const FromBox = styled(TextField)`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 11px 26px 11px 26px;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
  width: 100%;
`;

export default function LookupInput(props) {
  //const [term, setTerm] = useState(props.term || "");
  const [locations, setLocations] = useState(start);
  const [query, setQuery] = useState(props.query || "a");
  const classes = useStyles();

  useEffect(() => {
    const options = {
      headers: { apiKey: "H9cYBRBqvEQ9jTIoSMoKb-8ft15P0dCz" },
    };
    const fetchData = async () => {
      if (query !== "") {
        await axios
          .get(
            `https://tequila-api.kiwi.com/locations/query?term=${query}&locale=en-US&location_types=airport&limit=50&active_only=true`,
            options
          )
          .then((response) => {
            setLocations(response.data.locations);
          });
      }
    };
    fetchData();
  }, [query]);

  function submit(airport, country_code) {
    if (typeof props.search === "function") {
      props.search(airport, country_code);
    }
    //console.log(keyword);
  }

  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: [
        "id",
        { threshold: matchSorter.rankings.STARTS_WITH, key: "city.name" },
      ],
    });

  return (
    <Autocomplete
      id="controllable-states-demo"
      disableClearable
      noOptionsText="No found destination"
      options={locations}
      filterOptions={filterOptions}
      getOptionLabel={(option) => `${option.city.name} (${option.code})`}
      getOptionSelected={(option, value) => option.id === value.id}
      renderOption={(option) => (
        <Grid container alignItems="center">
          <Grid item>
            <LocationOnIcon className={classes.icon} />
          </Grid>
          <Grid item xs>
            <span>
              {option.city.name} ({option.code})
            </span>
            <Typography variant="body2" color="textSecondary">
              {option.city.country && option.city.country.name}
            </Typography>
          </Grid>
        </Grid>
      )}
      onInputChange={(e, value) => setQuery(value)}
      onChange={(e, value) => {
        submit(
          value.id,
          value.city.country === undefined
            ? value.country.code
            : value.city.country.code
        );
      }}
      renderInput={(params) => (
        <FromBox
          {...params}
          label={props.term}
          type="search"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const start = [
  {
    id: "JFK",
    int_id: 813,
    airport_int_id: 813,
    active: true,
    code: "STN",
    icao: "EGSS",
    name: "London Stansted",
    slug: "london-stansted-london-united-kingdom",
    slug_en: "london-stansted-london-united-kingdom",
    alternative_names: [],
    rank: 53,
    global_rank_dst: 125,
    dst_popularity_score: 78965,
    timezone: "Europe/London",
    city: {
      id: "london_gb",
      name: "London",
      code: "LON",
      slug: "london-united-kingdom",
      subdivision: null,
      region: {
        id: "northern-europe",
        name: "Northern Europe",
        slug: "northern-europe",
      },
      continent: {
        id: "europe",
        name: "Europe",
        slug: "europe",
        code: "EU",
      },
      country: {
        id: "GB",
        name: "United Kingdom",
        slug: "united-kingdom",
        code: "GB",
      },
      autonomous_territory: null,
    },
    location: {
      lat: 51.885,
      lon: 0.235,
    },
    alternative_departure_points: [
      {
        id: "GB-STAN-STAN",
        distance: 19.65,
        duration: 1427.6,
      },
      {
        id: "GB-BRAI-MARK",
        distance: 34.91,
        duration: 1864.1,
      },
      {
        id: "GB-STEV-BUSS",
        distance: 44.53,
        duration: 2742,
      },
      {
        id: "GB-CAMB-CAM2",
        distance: 49.63,
        duration: 2695.9,
      },
      {
        id: "CBG",
        distance: 51.01,
        duration: 2883.7,
      },
      {
        id: "LCY",
        distance: 55.86,
        duration: 3186.5,
      },
      {
        id: "LTN",
        distance: 65.87,
        duration: 3992.5,
      },
      {
        id: "SEN",
        distance: 67.25,
        duration: 3848.4,
      },
      {
        id: "LHR",
        distance: 97.99,
        duration: 5113,
      },
      {
        id: "LGW",
        distance: 120.54,
        duration: 5574.9,
      },
      {
        id: "NWI",
        distance: 143.49,
        duration: 6835.9,
      },
      {
        id: "SOU",
        distance: 191.65,
        duration: 8708.7,
      },
      {
        id: "BHX",
        distance: 194.02,
        duration: 8631.6,
      },
      {
        id: "EMA",
        distance: 200.75,
        duration: 8664.3,
      },
      {
        id: "DSA",
        distance: 232.75,
        duration: 10428.6,
      },
      {
        id: "BOH",
        distance: 233.51,
        duration: 10508.6,
      },
    ],
    tags: [
      {
        tag: "sightseeing",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "famous cities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "activities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "events",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "city break",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [1053, 1277, 1283, 1284, 1329],
    special: [
      {
        id: "canterbury-cathedral_poi",
        name: "Canterbury Cathedral",
        slug: "canterbury-cathedral",
      },
      {
        id: "british-museum_poi",
        name: "British Museum",
        slug: "british-museum",
      },
      {
        id: "portsea-island_poi",
        name: "Portsea Island",
        slug: "portsea-island",
      },
      {
        id: "natural-history-museum_poi",
        name: "Natural History Museum",
        slug: "natural-history-museum",
      },
      {
        id: "stonehenge_poi",
        name: "Stonehenge",
        slug: "stonehenge",
      },
      {
        id: "isle-of-wight_poi",
        name: "Isle of Wight",
        slug: "isle-of-wight",
      },
      {
        id: "tower-of-london_poi",
        name: "Tower of London",
        slug: "tower-of-london",
      },
      {
        id: "tate-modern_poi",
        name: "Tate Modern",
        slug: "tate-modern",
      },
      {
        id: "st-paul-s-cathedral_poi",
        name: "St. Paul's Cathedral",
        slug: "st-paul-s-cathedral",
      },
    ],
    tourist_region: [
      {
        id: "greater-london_poi",
        name: "Greater London",
        slug: "greater-london",
      },
    ],
    car_rentals: [],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
  {
    id: "LGW",
    int_id: 8949,
    airport_int_id: 8949,
    active: true,
    code: "LGW",
    icao: "EGKK",
    name: "Gatwick",
    slug: "gatwick-london-united-kingdom",
    slug_en: "gatwick-london-united-kingdom",
    alternative_names: ["Gatwick (London)", "London Gatwick (North Terminal)"],
    rank: 126,
    global_rank_dst: 64,
    dst_popularity_score: 195823,
    timezone: "Europe/London",
    city: {
      id: "london_gb",
      name: "London",
      code: "LON",
      slug: "london-united-kingdom",
      subdivision: null,
      region: {
        id: "northern-europe",
        name: "Northern Europe",
        slug: "northern-europe",
      },
      continent: {
        id: "europe",
        name: "Europe",
        slug: "europe",
        code: "EU",
      },
      country: {
        id: "GB",
        name: "United Kingdom",
        slug: "united-kingdom",
        code: "GB",
      },
      autonomous_territory: null,
    },
    location: {
      lat: 51.148056,
      lon: -0.190278,
    },
    alternative_departure_points: [
      {
        id: "GB-BANS-BUSS",
        distance: 31.12,
        duration: 1655.2,
      },
      {
        id: "GB-LOND-BELM",
        distance: 32.03,
        duration: 1814.8,
      },
      {
        id: "GB-SUTT-TRAI",
        distance: 33.77,
        duration: 1968.2,
      },
      {
        id: "GB-BRIG-BRI1",
        distance: 35.06,
        duration: 1616.9,
      },
      {
        id: "GB-SUTT-MANO",
        distance: 35.67,
        duration: 2109.4,
      },
      {
        id: "GB-BRIG-BRI3",
        distance: 36.15,
        duration: 1702.9,
      },
      {
        id: "GB-SUTT-ROSE",
        distance: 37.39,
        duration: 2203.6,
      },
      {
        id: "GB-LOND-MITC",
        distance: 37.43,
        duration: 2484.3,
      },
      {
        id: "GB-BRIG-BRI2",
        distance: 37.54,
        duration: 1843.7,
      },
      {
        id: "GB-BRIG-BRIG",
        distance: 39.44,
        duration: 2040,
      },
      {
        id: "GB-HOVE-KING",
        distance: 40.55,
        duration: 2122.6,
      },
      {
        id: "GB-LOND-STRE",
        distance: 41.04,
        duration: 2752.1,
      },
      {
        id: "GB-BRIG-BRI0",
        distance: 41.36,
        duration: 2328.7,
      },
      {
        id: "GB-HOVE-PORT",
        distance: 42.16,
        duration: 2081.5,
      },
      {
        id: "GB-SOUT-WEST",
        distance: 43.84,
        duration: 2161,
      },
      {
        id: "GB-LOND-STOC",
        distance: 45.55,
        duration: 3242.6,
      },
      {
        id: "GB-LOND-WAND",
        distance: 46.48,
        duration: 3044.4,
      },
      {
        id: "GB-SHOR-SHOR",
        distance: 47.66,
        duration: 2203,
      },
      {
        id: "GB-LOND-ELEP",
        distance: 48.43,
        duration: 3554.6,
      },
      {
        id: "GB-LOND-WALW",
        distance: 48.94,
        duration: 3727.4,
      },
      {
        id: "GB-LOND-VICT",
        distance: 48.97,
        duration: 3574,
      },
      {
        id: "GB-SHOR-SHO0",
        distance: 49.7,
        duration: 2335.6,
      },
      {
        id: "LHR",
        distance: 69.29,
        duration: 3305.5,
      },
      {
        id: "LCY",
        distance: 85.32,
        duration: 4193.5,
      },
      {
        id: "SEN",
        distance: 101.11,
        duration: 4740.5,
      },
      {
        id: "LTN",
        distance: 120.04,
        duration: 5264.8,
      },
      {
        id: "STN",
        distance: 121.4,
        duration: 5565.6,
      },
      {
        id: "SOU",
        distance: 144.28,
        duration: 6106.5,
      },
      {
        id: "CBG",
        distance: 156.76,
        duration: 6960,
      },
      {
        id: "BOH",
        distance: 186.14,
        duration: 7906.4,
      },
      {
        id: "BHX",
        distance: 231.22,
        duration: 9874.8,
      },
      {
        id: "BRS",
        distance: 232.58,
        duration: 10471.9,
      },
      {
        id: "NWI",
        distance: 249.24,
        duration: 10912.2,
      },
    ],
    tags: [
      {
        tag: "sightseeing",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "famous cities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "activities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "events",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "city break",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [1035, 1053, 1165, 1175, 1277, 1283, 1284, 1329],
    special: [
      {
        id: "british-museum_poi",
        name: "British Museum",
        slug: "british-museum",
      },
      {
        id: "roman-baths-bath_poi",
        name: "Roman Baths, Bath",
        slug: "roman-baths",
      },
      {
        id: "stonehenge_poi",
        name: "Stonehenge",
        slug: "stonehenge",
      },
      {
        id: "canterbury-cathedral_poi",
        name: "Canterbury Cathedral",
        slug: "canterbury-cathedral",
      },
      {
        id: "portsea-island_poi",
        name: "Portsea Island",
        slug: "portsea-island",
      },
      {
        id: "natural-history-museum_poi",
        name: "Natural History Museum",
        slug: "natural-history-museum",
      },
      {
        id: "tate-modern_poi",
        name: "Tate Modern",
        slug: "tate-modern",
      },
      {
        id: "isle-of-wight_poi",
        name: "Isle of Wight",
        slug: "isle-of-wight",
      },
      {
        id: "avebury_poi",
        name: "Avebury",
        slug: "avebury",
      },
      {
        id: "st-paul-s-cathedral_poi",
        name: "St. Paul's Cathedral",
        slug: "st-paul-s-cathedral",
      },
      {
        id: "tower-of-london_poi",
        name: "Tower of London",
        slug: "tower-of-london",
      },
    ],
    tourist_region: [
      {
        id: "greater-london_poi",
        name: "Greater London",
        slug: "greater-london",
      },
    ],
    car_rentals: [
      {
        provider_id: 1175,
        providers_locations: ["4435087", "4284212"],
      },
    ],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
  {
    id: "ISP",
    int_id: 5901,
    airport_int_id: 5901,
    active: true,
    code: "ISP",
    icao: "KISP",
    name: "Long Island MacArthur",
    slug: "long-island-macarthur-islip-new-york-united-states",
    slug_en: "long-island-macarthur-islip-new-york-united-states",
    alternative_names: [],
    rank: 157,
    global_rank_dst: 328,
    dst_popularity_score: 23511,
    timezone: "America/New_York",
    city: {
      id: "islip_ny_us",
      name: "Islip",
      code: "ISP",
      slug: "islip-new-york-united-states",
      subdivision: {
        id: "NY_US",
        name: "New York",
        slug: "new-york-united-states",
        code: "NY",
      },
      region: {
        id: "northern-america",
        name: "Northern America",
        slug: "northern-america",
      },
      continent: {
        id: "north-america",
        name: "North America",
        slug: "north-america",
        code: "NA",
      },
      country: {
        id: "US",
        name: "United States",
        slug: "united-states",
        code: "US",
      },
      autonomous_territory: null,
    },
    location: {
      lat: 40.795278,
      lon: -73.100278,
    },
    alternative_departure_points: [
      {
        id: "JFK",
        distance: 73.84,
        duration: 3805,
      },
      {
        id: "LGA",
        distance: 83.79,
        duration: 3895.5,
      },
      {
        id: "HVN",
        distance: 91.94,
        duration: 8478.3,
      },
      {
        id: "EWR",
        distance: 117.46,
        duration: 5964.5,
      },
      {
        id: "HPN",
        distance: 121.04,
        duration: 5928.1,
      },
      {
        id: "BDL",
        distance: 170.63,
        duration: 11928.3,
      },
      {
        id: "TTN",
        distance: 186.51,
        duration: 9115.8,
      },
      {
        id: "SWF",
        distance: 186.94,
        duration: 8730.3,
      },
      {
        id: "PVD",
        distance: 203.46,
        duration: 14550.7,
      },
      {
        id: "ABE",
        distance: 232.57,
        duration: 11025.8,
      },
      {
        id: "ORH",
        distance: 241.5,
        duration: 14885.6,
      },
    ],
    tags: [
      {
        tag: "romance",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "sightseeing",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [1175, 1277],
    special: [
      {
        id: "times-square_poi",
        name: "Times Square",
        slug: "times-square",
      },
      {
        id: "manhattan-island_poi",
        name: "Manhattan Island",
        slug: "manhattan-island",
      },
      {
        id: "empire-state-building_poi",
        name: "Empire State Building",
        slug: "empire-state-building",
      },
      {
        id: "statue-of-liberty_poi",
        name: "Statue of Liberty",
        slug: "statue-of-liberty",
      },
      {
        id: "staten-island_poi",
        name: "Staten Island",
        slug: "staten-island",
      },
      {
        id: "metropolitan-museum-of-art_poi",
        name: "Metropolitan Museum of Art",
        slug: "metropolitan-museum-of-art",
      },
    ],
    tourist_region: [
      {
        id: "long-island_poi",
        name: "Long Island",
        slug: "long-island",
      },
    ],
    car_rentals: [
      {
        provider_id: 1175,
        providers_locations: ["3915544", "356211", "508278", "356641"],
      },
    ],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
  {
    id: "LHR",
    int_id: 3940,
    airport_int_id: 3940,
    active: true,
    code: "LHR",
    icao: "EGLL",
    name: "Heathrow",
    slug: "heathrow-london-united-kingdom",
    slug_en: "heathrow-london-united-kingdom",
    alternative_names: ["Heathrow (London)"],
    rank: 11,
    global_rank_dst: 12,
    dst_popularity_score: 1170577,
    timezone: "Europe/London",
    city: {
      id: "london_gb",
      name: "London",
      code: "LON",
      slug: "london-united-kingdom",
      subdivision: null,
      region: {
        id: "northern-europe",
        name: "Northern Europe",
        slug: "northern-europe",
      },
      continent: {
        id: "europe",
        name: "Europe",
        slug: "europe",
        code: "EU",
      },
      country: {
        id: "GB",
        name: "United Kingdom",
        slug: "united-kingdom",
        code: "GB",
      },
      autonomous_territory: null,
    },
    location: {
      lat: 51.4775,
      lon: -0.461389,
    },
    alternative_departure_points: [
      {
        id: "GB-LOND-HAMM",
        distance: 21.01,
        duration: 1463.1,
      },
      {
        id: "GB-LOND-VICT",
        distance: 26.06,
        duration: 1953.8,
      },
      {
        id: "GB-LOND-BISH",
        distance: 26.34,
        duration: 1933.2,
      },
      {
        id: "GB-LOND-WAND",
        distance: 26.65,
        duration: 1982.3,
      },
      {
        id: "GB-LOND-MARB",
        distance: 26.89,
        duration: 1972.9,
      },
      {
        id: "GB-LOND-MAR0",
        distance: 27.12,
        duration: 2010.7,
      },
      {
        id: "GB-LOND-LON2",
        distance: 27.64,
        duration: 2087,
      },
      {
        id: "GB-LOND-STJO",
        distance: 28.7,
        duration: 2185.6,
      },
      {
        id: "GB-SUTT-ROSE",
        distance: 28.76,
        duration: 2659.4,
      },
      {
        id: "GB-LOND-LON3",
        distance: 29.11,
        duration: 2092,
      },
      {
        id: "GB-SUTT-TRAI",
        distance: 29.5,
        duration: 2682.2,
      },
      {
        id: "GB-LOND-STOC",
        distance: 30.01,
        duration: 2428.3,
      },
      {
        id: "GB-SUTT-MANO",
        distance: 30.07,
        duration: 2705.6,
      },
      {
        id: "GB-LOND-ELEP",
        distance: 30.17,
        duration: 2478.7,
      },
      {
        id: "GB-LOND-FIN0",
        distance: 30.96,
        duration: 2241.5,
      },
      {
        id: "GB-LOND-FINC",
        distance: 31.72,
        duration: 2329.1,
      },
      {
        id: "GB-LOND-WALW",
        distance: 32.19,
        duration: 2653.6,
      },
      {
        id: "GB-LOND-STRE",
        distance: 32.28,
        duration: 2546.2,
      },
      {
        id: "GB-LOND-ALDG",
        distance: 32.44,
        duration: 2747.2,
      },
      {
        id: "GB-LOND-SHOR",
        distance: 32.53,
        duration: 2751.3,
      },
      {
        id: "GB-LOND-MITC",
        distance: 33.02,
        duration: 2603.8,
      },
      {
        id: "GB-LOND-WHIT",
        distance: 33.25,
        duration: 2819.2,
      },
      {
        id: "GB-LOND-BETH",
        distance: 33.99,
        duration: 2975.1,
      },
      {
        id: "GB-WATF-LOND",
        distance: 34.13,
        duration: 2257.3,
      },
      {
        id: "GB-LOND-NEWC",
        distance: 34.93,
        duration: 2934.2,
      },
      {
        id: "GB-LOND-MILE",
        distance: 35.11,
        duration: 3006.5,
      },
      {
        id: "GB-LOND-BOWW",
        distance: 36.11,
        duration: 3109.5,
      },
      {
        id: "GB-LOND-LEWI",
        distance: 37.45,
        duration: 3209,
      },
      {
        id: "GB-LOND-STR0",
        distance: 38.84,
        duration: 3451.2,
      },
      {
        id: "XOF",
        distance: 38.9,
        duration: 3446,
      },
      {
        id: "GB-GUIL-TESC",
        distance: 39.49,
        duration: 1943.9,
      },
      {
        id: "GB-HEME-BRID",
        distance: 40.54,
        duration: 2077.1,
      },
      {
        id: "LCY",
        distance: 42.23,
        duration: 3713.8,
      },
      {
        id: "GB-ELTH-WEST",
        distance: 43.37,
        duration: 3628.9,
      },
      {
        id: "GB-READ-MERE",
        distance: 43.47,
        duration: 2070.2,
      },
      {
        id: "GB-BANS-BUSS",
        distance: 45.38,
        duration: 2542,
      },
      {
        id: "GB-LOND-BELM",
        distance: 46.43,
        duration: 2558.4,
      },
      {
        id: "GB-LEWK-TURN",
        distance: 49.51,
        duration: 2172.4,
      },
      {
        id: "LTN",
        distance: 58.45,
        duration: 2828.9,
      },
      {
        id: "LGW",
        distance: 69.61,
        duration: 3275.9,
      },
      {
        id: "SOU",
        distance: 100.93,
        duration: 4496.5,
      },
      {
        id: "STN",
        distance: 105.95,
        duration: 4956,
      },
      {
        id: "CBG",
        distance: 115.98,
        duration: 5738,
      },
      {
        id: "SEN",
        distance: 123.26,
        duration: 5624.5,
      },
      {
        id: "BOH",
        distance: 142.79,
        duration: 6296.4,
      },
      {
        id: "BHX",
        distance: 169.63,
        duration: 7438.9,
      },
      {
        id: "BRS",
        distance: 181.58,
        duration: 8299.7,
      },
      {
        id: "EMA",
        distance: 190.1,
        duration: 8034.3,
      },
      {
        id: "NWI",
        distance: 217.28,
        duration: 9887.9,
      },
      {
        id: "CWL",
        distance: 243.03,
        duration: 10545,
      },
      {
        id: "EXT",
        distance: 247.65,
        duration: 11020.3,
      },
    ],
    tags: [
      {
        tag: "sightseeing",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "famous cities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "activities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "events",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "city break",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [1035, 1053, 1165, 1175, 1227, 1229, 1277, 1283, 1284, 1329],
    special: [
      {
        id: "avebury_poi",
        name: "Avebury",
        slug: "avebury",
      },
      {
        id: "tower-of-london_poi",
        name: "Tower of London",
        slug: "tower-of-london",
      },
      {
        id: "tintern-abbey-united-kingdom_poi",
        name: "Tintern Abbey, United Kingdom",
        slug: "tintern-abbey",
      },
      {
        id: "st-david-s-cathedral-cardiff_poi",
        name: "St. David's Cathedral, Cardiff",
        slug: "st-david-s-cathedral",
      },
      {
        id: "st-paul-s-cathedral_poi",
        name: "St. Paul's Cathedral",
        slug: "st-paul-s-cathedral",
      },
      {
        id: "canterbury-cathedral_poi",
        name: "Canterbury Cathedral",
        slug: "canterbury-cathedral",
      },
      {
        id: "isle-of-wight_poi",
        name: "Isle of Wight",
        slug: "isle-of-wight",
      },
      {
        id: "portsea-island_poi",
        name: "Portsea Island",
        slug: "portsea-island",
      },
      {
        id: "stonehenge_poi",
        name: "Stonehenge",
        slug: "stonehenge",
      },
      {
        id: "british-museum_poi",
        name: "British Museum",
        slug: "british-museum",
      },
      {
        id: "tate-modern_poi",
        name: "Tate Modern",
        slug: "tate-modern",
      },
      {
        id: "st-fagans-national-history-museum_poi",
        name: "St Fagans: National History Museum",
        slug: "st-fagans-national-history-museum",
      },
      {
        id: "natural-history-museum_poi",
        name: "Natural History Museum",
        slug: "natural-history-museum",
      },
      {
        id: "roman-baths-bath_poi",
        name: "Roman Baths, Bath",
        slug: "roman-baths",
      },
    ],
    tourist_region: [
      {
        id: "greater-london_poi",
        name: "Greater London",
        slug: "greater-london",
      },
    ],
    car_rentals: [
      {
        provider_id: 1175,
        providers_locations: ["245299", "164379", "4263809", "4343811"],
      },
    ],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
  {
    id: "LGB",
    int_id: 8941,
    airport_int_id: 8941,
    active: true,
    code: "LGB",
    icao: "KLGB",
    name: "Long Beach",
    slug: "long-beach-long-beach-california-united-states",
    slug_en: "long-beach-long-beach-california-united-states",
    alternative_names: [],
    rank: 404,
    global_rank_dst: 251,
    dst_popularity_score: 36204,
    timezone: "America/Los_Angeles",
    city: {
      id: "long-beach_ca_us",
      name: "Long Beach",
      code: "LGB",
      slug: "long-beach-california-united-states",
      subdivision: {
        id: "CA_US",
        name: "California",
        slug: "california-united-states",
        code: "CA",
      },
      region: {
        id: "northern-america",
        name: "Northern America",
        slug: "northern-america",
      },
      continent: {
        id: "north-america",
        name: "North America",
        slug: "north-america",
        code: "NA",
      },
      country: {
        id: "US",
        name: "United States",
        slug: "united-states",
        code: "US",
      },
      autonomous_territory: null,
    },
    location: {
      lat: 33.817778,
      lon: -118.15167,
    },
    alternative_departure_points: [
      {
        id: "US-LONG-GREY",
        distance: 6.6,
        duration: 582.5,
      },
      {
        id: "US-LONG-LONG",
        distance: 8.21,
        duration: 755.7,
      },
      {
        id: "HHR",
        distance: 25.48,
        duration: 1312.6,
      },
      {
        id: "US-FULL-CAST",
        distance: 32.6,
        duration: 1719.9,
      },
      {
        id: "LAX",
        distance: 33.18,
        duration: 1650.6,
      },
      {
        id: "US-LOSA-LOS0",
        distance: 34.3,
        duration: 1694,
      },
      {
        id: "US-ANAH-ANAH",
        distance: 34.47,
        duration: 1689,
      },
      {
        id: "US-SANT-SAN3",
        distance: 35.09,
        duration: 1651.9,
      },
      {
        id: "SNA",
        distance: 35.33,
        duration: 1691,
      },
      {
        id: "US-LOSA-LADO",
        distance: 35.92,
        duration: 1776.8,
      },
      {
        id: "US-LOSA-LOSA",
        distance: 36.34,
        duration: 1808.3,
      },
      {
        id: "US-ROSE-ELMO",
        distance: 43.03,
        duration: 2178.6,
      },
      {
        id: "US-GLEN-CAST",
        distance: 45.06,
        duration: 2202.8,
      },
      {
        id: "US-LOSA-LAWE",
        distance: 45.97,
        duration: 2209.9,
      },
      {
        id: "US-IRVI-CAST",
        distance: 49.48,
        duration: 2336.1,
      },
      {
        id: "BUR",
        distance: 61.22,
        duration: 3006,
      },
      {
        id: "ONT",
        distance: 77.7,
        duration: 3735.7,
      },
      {
        id: "CLD",
        distance: 125.84,
        duration: 5634.5,
      },
      {
        id: "SAN",
        distance: 171.13,
        duration: 7564.7,
      },
      {
        id: "PSP",
        distance: 183.82,
        duration: 8026.4,
      },
      {
        id: "SBA",
        distance: 202.27,
        duration: 9625.9,
      },
      {
        id: "TIJ",
        distance: 203.86,
        duration: 9019.4,
      },
      {
        id: "BFL",
        distance: 221.96,
        duration: 9921.7,
      },
    ],
    tags: [
      {
        tag: "beach",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "family fun",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [1175, 1277],
    special: [
      {
        id: "griffith-observatory_poi",
        name: "Griffith Observatory",
        slug: "griffith-observatory",
      },
    ],
    tourist_region: [
      {
        id: "los-angeles-metropolitan-area_poi",
        name: "Los Angeles Metropolitan Area",
        slug: "los-angeles-metropolitan-area",
      },
    ],
    car_rentals: [
      {
        provider_id: 1175,
        providers_locations: ["359741", "359091", "506093"],
      },
    ],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
  {
    id: "ELS",
    int_id: 8592,
    airport_int_id: 8592,
    active: true,
    code: "ELS",
    icao: "FAEL",
    name: "East London",
    slug: "east-london-east-london-south-africa",
    slug_en: "east-london-east-london-south-africa",
    alternative_names: [],
    rank: 413,
    global_rank_dst: 367,
    dst_popularity_score: 17837,
    timezone: "Africa/Johannesburg",
    city: {
      id: "east-london_za",
      name: "East London",
      code: "ELS",
      slug: "east-london-south-africa",
      subdivision: null,
      region: {
        id: "southern-africa",
        name: "Southern Africa",
        slug: "southern-africa",
      },
      continent: {
        id: "africa",
        name: "Africa",
        slug: "africa",
        code: "AF",
      },
      country: {
        id: "ZA",
        name: "South Africa",
        slug: "south-africa",
        code: "ZA",
      },
      autonomous_territory: null,
    },
    location: {
      lat: -33.035556,
      lon: 27.825833,
    },
    alternative_departure_points: [
      {
        id: "UTT",
        distance: 242.01,
        duration: 11464.4,
      },
    ],
    tags: [
      {
        tag: "sightseeing",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "family fun",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "activities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "events",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "city break",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [1175],
    special: [],
    tourist_region: [],
    car_rentals: [
      {
        provider_id: 1175,
        providers_locations: ["19090", "657418"],
      },
    ],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
  {
    id: "LDB",
    int_id: 3494,
    airport_int_id: 3494,
    active: true,
    code: "LDB",
    icao: "SBLO",
    name: "Londrina",
    slug: "londrina-londrina-state-of-parana-brazil",
    slug_en: "londrina-londrina-state-of-parana-brazil",
    alternative_names: ["Aeroporto de Londrina"],
    rank: 742,
    global_rank_dst: 331,
    dst_popularity_score: 34495,
    timezone: "America/Sao_Paulo",
    city: {
      id: "londrina_pr_br",
      name: "Londrina",
      code: "LDB",
      slug: "londrina-state-of-parana-brazil",
      subdivision: {
        id: "PR_BR",
        name: "State of Paraná",
        slug: "state-of-parana-brazil",
        code: "PR",
      },
      region: {
        id: "southern-america",
        name: "Southern America",
        slug: "southern-america",
      },
      continent: {
        id: "south-america",
        name: "South America",
        slug: "south-america",
        code: "SA",
      },
      country: {
        id: "BR",
        name: "Brazil",
        slug: "brazil",
        code: "BR",
      },
      autonomous_territory: null,
    },
    location: {
      lat: -23.333611,
      lon: -51.13,
    },
    alternative_departure_points: [
      {
        id: "MGF",
        distance: 114.94,
        duration: 6501,
      },
      {
        id: "PPB",
        distance: 166.88,
        duration: 9672.2,
      },
      {
        id: "MII",
        distance: 206.62,
        duration: 10643.1,
      },
    ],
    tags: [
      {
        tag: "romance",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "sports",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [1175, 1277, 1282],
    special: [],
    tourist_region: [],
    car_rentals: [
      {
        provider_id: 1175,
        providers_locations: ["716193"],
      },
    ],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
  {
    id: "LCY",
    int_id: 9625,
    airport_int_id: 9625,
    active: true,
    code: "LCY",
    icao: "EGLC",
    name: "London City",
    slug: "london-city-london-united-kingdom",
    slug_en: "london-city-london-united-kingdom",
    alternative_names: ["City Airport (London)"],
    rank: 745,
    global_rank_dst: 178,
    dst_popularity_score: 37737,
    timezone: "Europe/London",
    city: {
      id: "london_gb",
      name: "London",
      code: "LON",
      slug: "london-united-kingdom",
      subdivision: null,
      region: {
        id: "northern-europe",
        name: "Northern Europe",
        slug: "northern-europe",
      },
      continent: {
        id: "europe",
        name: "Europe",
        slug: "europe",
        code: "EU",
      },
      country: {
        id: "GB",
        name: "United Kingdom",
        slug: "united-kingdom",
        code: "GB",
      },
      autonomous_territory: null,
    },
    location: {
      lat: 51.505,
      lon: 0.054167,
    },
    alternative_departure_points: [
      {
        id: "GB-LOND-BOWW",
        distance: 10.38,
        duration: 1188.9,
      },
      {
        id: "GB-LOND-STR0",
        distance: 11.13,
        duration: 1342.2,
      },
      {
        id: "GB-LOND-MILE",
        distance: 11.51,
        duration: 1362,
      },
      {
        id: "XOF",
        distance: 11.57,
        duration: 1376.9,
      },
      {
        id: "GB-LOND-WHIT",
        distance: 11.89,
        duration: 1367.6,
      },
      {
        id: "GB-LOND-ALDG",
        distance: 12.88,
        duration: 1473.8,
      },
      {
        id: "GB-LOND-BETH",
        distance: 12.88,
        duration: 1441.5,
      },
      {
        id: "GB-LOND-SHOR",
        distance: 13.65,
        duration: 1578.4,
      },
      {
        id: "GB-LOND-LEWI",
        distance: 15.01,
        duration: 1709.6,
      },
      {
        id: "GB-LOND-NEWC",
        distance: 15.2,
        duration: 1682.1,
      },
      {
        id: "GB-LOND-ELEP",
        distance: 15.42,
        duration: 1736.8,
      },
      {
        id: "GB-LOND-WALW",
        distance: 15.74,
        duration: 1774.5,
      },
      {
        id: "GB-ELTH-WEST",
        distance: 16.05,
        duration: 1589.5,
      },
      {
        id: "GB-LOND-STOC",
        distance: 18.7,
        duration: 2089.3,
      },
      {
        id: "GB-LOND-VICT",
        distance: 19.09,
        duration: 2296.8,
      },
      {
        id: "GB-LOND-MARB",
        distance: 19.42,
        duration: 2309.1,
      },
      {
        id: "GB-LOND-MAR0",
        distance: 19.48,
        duration: 2324.9,
      },
      {
        id: "GB-LOND-LON2",
        distance: 20.29,
        duration: 2355.3,
      },
      {
        id: "GB-LOND-BISH",
        distance: 21.49,
        duration: 2466.4,
      },
      {
        id: "GB-LOND-STJO",
        distance: 21.58,
        duration: 2493.3,
      },
      {
        id: "GB-LOND-STRE",
        distance: 23.16,
        duration: 2556.3,
      },
      {
        id: "GB-LOND-FINC",
        distance: 23.69,
        duration: 2707.5,
      },
      {
        id: "GB-LOND-HAMM",
        distance: 24.25,
        duration: 2799.7,
      },
      {
        id: "GB-LOND-WAND",
        distance: 24.8,
        duration: 2710.1,
      },
      {
        id: "GB-LOND-MITC",
        distance: 27.26,
        duration: 2956.9,
      },
      {
        id: "GB-GRAV-BLUE",
        distance: 29.93,
        duration: 2093.6,
      },
      {
        id: "GB-SUTT-ROSE",
        distance: 30.87,
        duration: 3275.4,
      },
      {
        id: "GB-SUTT-MANO",
        distance: 33.16,
        duration: 3439.4,
      },
      {
        id: "GB-LOND-LON3",
        distance: 33.24,
        duration: 2420.9,
      },
      {
        id: "GB-SUTT-TRAI",
        distance: 34.14,
        duration: 3518.1,
      },
      {
        id: "GB-LOND-BELM",
        distance: 35.75,
        duration: 3646.6,
      },
      {
        id: "GB-LOND-FIN0",
        distance: 36.04,
        duration: 2697.5,
      },
      {
        id: "GB-WATF-LOND",
        distance: 39.13,
        duration: 2740.5,
      },
      {
        id: "GB-BANS-BUSS",
        distance: 39.64,
        duration: 3917.5,
      },
      {
        id: "LHR",
        distance: 44.88,
        duration: 4147.9,
      },
      {
        id: "STN",
        distance: 54.42,
        duration: 3212.4,
      },
      {
        id: "SEN",
        distance: 55.62,
        duration: 3265.4,
      },
      {
        id: "LTN",
        distance: 82.58,
        duration: 4135.6,
      },
      {
        id: "LGW",
        distance: 84.44,
        duration: 4316.5,
      },
      {
        id: "CBG",
        distance: 89.78,
        duration: 4606.8,
      },
      {
        id: "SOU",
        distance: 143.13,
        duration: 7952.1,
      },
      {
        id: "NWI",
        distance: 182.26,
        duration: 8559,
      },
      {
        id: "BOH",
        distance: 184.99,
        duration: 9752,
      },
      {
        id: "BHX",
        distance: 207.39,
        duration: 9303.9,
      },
      {
        id: "EMA",
        distance: 214.23,
        duration: 9341,
      },
      {
        id: "BRS",
        distance: 221.29,
        duration: 11678.4,
      },
    ],
    tags: [
      {
        tag: "sightseeing",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "famous cities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "activities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "events",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "city break",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [1175, 1277, 1284],
    special: [
      {
        id: "tower-of-london_poi",
        name: "Tower of London",
        slug: "tower-of-london",
      },
      {
        id: "tate-modern_poi",
        name: "Tate Modern",
        slug: "tate-modern",
      },
      {
        id: "stonehenge_poi",
        name: "Stonehenge",
        slug: "stonehenge",
      },
      {
        id: "isle-of-wight_poi",
        name: "Isle of Wight",
        slug: "isle-of-wight",
      },
      {
        id: "canterbury-cathedral_poi",
        name: "Canterbury Cathedral",
        slug: "canterbury-cathedral",
      },
      {
        id: "natural-history-museum_poi",
        name: "Natural History Museum",
        slug: "natural-history-museum",
      },
      {
        id: "st-paul-s-cathedral_poi",
        name: "St. Paul's Cathedral",
        slug: "st-paul-s-cathedral",
      },
      {
        id: "portsea-island_poi",
        name: "Portsea Island",
        slug: "portsea-island",
      },
      {
        id: "avebury_poi",
        name: "Avebury",
        slug: "avebury",
      },
      {
        id: "british-museum_poi",
        name: "British Museum",
        slug: "british-museum",
      },
    ],
    tourist_region: [
      {
        id: "greater-london_poi",
        name: "Greater London",
        slug: "greater-london",
      },
    ],
    car_rentals: [
      {
        provider_id: 1175,
        providers_locations: ["245314", "164389", "4397519"],
      },
    ],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
  {
    id: "SEN",
    int_id: 8261,
    airport_int_id: 8261,
    active: true,
    code: "SEN",
    icao: "EGMC",
    name: "London Southend",
    slug: "london-southend-london-united-kingdom",
    slug_en: "london-southend-london-united-kingdom",
    alternative_names: [],
    rank: 784,
    global_rank_dst: 258,
    dst_popularity_score: 6587,
    timezone: "Europe/London",
    city: {
      id: "london_gb",
      name: "London",
      code: "LON",
      slug: "london-united-kingdom",
      subdivision: null,
      region: {
        id: "northern-europe",
        name: "Northern Europe",
        slug: "northern-europe",
      },
      continent: {
        id: "europe",
        name: "Europe",
        slug: "europe",
        code: "EU",
      },
      country: {
        id: "GB",
        name: "United Kingdom",
        slug: "united-kingdom",
        code: "GB",
      },
      autonomous_territory: null,
    },
    location: {
      lat: 51.571389,
      lon: 0.695556,
    },
    alternative_departure_points: [
      {
        id: "GB-GRAV-BLUE",
        distance: 46.03,
        duration: 2530.9,
      },
      {
        id: "LCY",
        distance: 56.84,
        duration: 3209.3,
      },
      {
        id: "STN",
        distance: 67.45,
        duration: 3831.5,
      },
      {
        id: "LGW",
        distance: 100.55,
        duration: 4753.8,
      },
      {
        id: "CBG",
        distance: 104.72,
        duration: 5327.4,
      },
      {
        id: "LTN",
        distance: 106.06,
        duration: 4929.7,
      },
      {
        id: "LHR",
        distance: 123.42,
        duration: 5786,
      },
      {
        id: "NWI",
        distance: 163.69,
        duration: 8463.6,
      },
      {
        id: "SOU",
        distance: 207.09,
        duration: 8967.1,
      },
      {
        id: "BHX",
        distance: 230.87,
        duration: 10098,
      },
      {
        id: "EMA",
        distance: 237.71,
        duration: 10135.1,
      },
      {
        id: "BOH",
        distance: 248.94,
        duration: 10767,
      },
    ],
    tags: [
      {
        tag: "sightseeing",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "famous cities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "activities",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "events",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "city break",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [1165, 1175, 1277, 1284],
    special: [
      {
        id: "british-museum_poi",
        name: "British Museum",
        slug: "british-museum",
      },
      {
        id: "isle-of-wight_poi",
        name: "Isle of Wight",
        slug: "isle-of-wight",
      },
      {
        id: "canterbury-cathedral_poi",
        name: "Canterbury Cathedral",
        slug: "canterbury-cathedral",
      },
      {
        id: "st-paul-s-cathedral_poi",
        name: "St. Paul's Cathedral",
        slug: "st-paul-s-cathedral",
      },
      {
        id: "tate-modern_poi",
        name: "Tate Modern",
        slug: "tate-modern",
      },
      {
        id: "portsea-island_poi",
        name: "Portsea Island",
        slug: "portsea-island",
      },
      {
        id: "tower-of-london_poi",
        name: "Tower of London",
        slug: "tower-of-london",
      },
      {
        id: "natural-history-museum_poi",
        name: "Natural History Museum",
        slug: "natural-history-museum",
      },
    ],
    tourist_region: [
      {
        id: "greater-london_poi",
        name: "Greater London",
        slug: "greater-london",
      },
    ],
    car_rentals: [
      {
        provider_id: 1175,
        providers_locations: ["679308"],
      },
    ],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
  {
    id: "CGQ",
    int_id: 5022,
    airport_int_id: 5022,
    active: true,
    code: "CGQ",
    icao: "ZYCC",
    name: "Changchun Longjia International",
    slug: "changchun-longjia-international-changchun-china",
    slug_en: "changchun-longjia-international-changchun-china",
    alternative_names: ["长春龙嘉国际机场"],
    rank: 873,
    global_rank_dst: 464,
    dst_popularity_score: 5515,
    timezone: "Asia/Shanghai",
    city: {
      id: "changchun_cn",
      name: "Changchun",
      code: "CGQ",
      slug: "changchun-china",
      subdivision: null,
      region: {
        id: "eastern-asia",
        name: "Eastern Asia",
        slug: "eastern-asia",
      },
      continent: {
        id: "asia",
        name: "Asia",
        slug: "asia",
        code: "AS",
      },
      country: {
        id: "CN",
        name: "China",
        slug: "china",
        code: "CN",
      },
      autonomous_territory: null,
    },
    location: {
      lat: 43.996111,
      lon: 125.685278,
    },
    alternative_departure_points: [
      {
        id: "YSQ",
        distance: 218.19,
        duration: 9368.5,
      },
      {
        id: "HRB",
        distance: 249.73,
        duration: 11528.5,
      },
    ],
    tags: [
      {
        tag: "nightlife",
        month_to: -1,
        month_from: -1,
      },
      {
        tag: "sightseeing",
        month_to: -1,
        month_from: -1,
      },
    ],
    providers: [],
    special: [],
    tourist_region: [],
    car_rentals: [],
    new_ground: false,
    routing_priority: 0,
    type: "airport",
  },
];
