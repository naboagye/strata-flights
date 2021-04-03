import React, { useState } from "react";
import { RadioButtonGroup } from "react-rainbow-components";

const options = [
  { value: "price", label: "Cheapest" },
  { value: "duration", label: "Fastest" },
  { value: "quality", label: "Best" },
];

export default function Sort(props) {
  const [value, setValue] = useState("price");

  function submit(value) {
    if (typeof props.search === "function") {
      props.search(value);
    }
  }

  const handleOnChange = (event) => {
    setValue(event.target.value);
    submit(event.target.value);
  };
  return (
    <RadioButtonGroup
      id="radio-button-group-component-1"
      options={options}
      value={value}
      onChange={handleOnChange}
      size="large"
      variant="brand"
    />
  );
}
