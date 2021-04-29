/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { matchSorter } from "match-sorter";
import tw from "twin.macro";

const Input = tw.input`border-2 px-5 py-3 rounded focus:outline-none font-medium transition duration-300 hocus:border-primary-500 w-full`;

export default function LookupInput(props) {
  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState(props.query || "a");

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

  function submit(airport, country_code, name) {
    if (typeof props.search === "function") {
      props.search(airport, country_code, name);
    }
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
      id="custom-input-demo"
      options={locations}
      filterOptions={filterOptions}
      noOptionsText="No found destination"
      getOptionLabel={(option) => `${option.city.name} (${option.code})`}
      renderOption={(option) => (
        <React.Fragment>
          {option.city.name} ({option.code})
        </React.Fragment>
      )}
      onInputChange={(event, value) => setQuery(value)}
      onChange={(e, value) =>
        submit(value.id, value.city.country.code, value.city.name)
      }
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <Input type="text" {...params.inputProps} placeholder="Destination" />
        </div>
      )}
    />
  );
}
