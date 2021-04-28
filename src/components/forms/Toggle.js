import React, { useState, useEffect } from "react";
import { CheckboxToggle } from "react-rainbow-components";

export default function Toggle(props) {
  const [value, setValue] = useState(false);
  const search = props.search;

  const handleOnChange = (event) => {
    setValue(!value);
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
    <CheckboxToggle
      label="Show Countries on Lockdown"
      value={value}
      onChange={handleOnChange}
    />
  );
}
