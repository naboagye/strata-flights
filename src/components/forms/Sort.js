import React, { useState } from "react";
import { RadioButtonGroup } from "react-rainbow-components";

const options = [
  { value: "price", label: "Cheapest" },
  { value: "duration", label: "Fastest" },
  { value: "quality", label: "Best" },
];

const containerStyles = {
  margin: "10px auto 10px auto",
};

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
    <div
      className="rainbow-p-vertical_large rainbow-align-content_center rainbow-flex_wrap"
      style={containerStyles}
    >
      <RadioButtonGroup
        id="radio-button-group-component-2"
        options={options}
        value={value}
        onChange={handleOnChange}
        size="large"
        variant="brand"
      />
    </div>
  );
}
