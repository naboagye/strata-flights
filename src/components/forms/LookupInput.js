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
  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState(props.query || "a");
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      if (query !== "") {
        await axios
          .get(
            `https://xtogjhen60.execute-api.eu-west-2.amazonaws.com/dev/locations/query?term=${query}&locale=en-US&location_types=airport&limit=50&active_only=true`
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

