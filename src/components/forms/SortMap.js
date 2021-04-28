import React, { useState, useEffect } from "react";
import { RadioButtonGroup } from "react-rainbow-components";

const options = [
  { value: "dailyCases", label: "Cases in the last 24 hours" },
  { value: "rate", label: "Weekly Rate of cases per 100k people" },
];

// const containerStyles = {
//   margin: "10px auto 10px auto",
// };

export default function Sort(props) {
  const [value, setValue] = useState("dailyCases");
  const search = props.search;
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    function submit(value) {
      if (typeof search === "function") {
        search(value);
      }
    }
    submit(value);
  }, [value, search]);
  return (
    <div
    //className="rainbow-p-around_x-large rainbow-align-content_center"
    //style={containerStyles}
    >
      <RadioButtonGroup
        id="radio-button-group-component-1"
        options={options}
        value={value}
        label="Filter Map"
        onChange={handleOnChange}
        size="large"
        variant="brand"
      />
    </div>
  );
}
