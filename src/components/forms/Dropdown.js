import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Picklist, Option } from "react-rainbow-components";

const containerStyles = {
  width: "130px",
};

const DropDown = forwardRef((props, ref) => {
  const [picklistValue, setPicklistValue] = useState({
    name: props.options[0],
    label: props.options[0],
  });

  useImperativeHandle(ref, () => {
    return {
      picklistValue: picklistValue,
    };
  });

  function submit(keyword) {
    if (typeof props.search === "function") {
      props.search(keyword);
    }
  }

  return (
    <div className="rainbow-flex rainbow-align_right">
      <Picklist
        id="picklist-10"
        style={containerStyles}
        onChange={(value) => {
          setPicklistValue(value);
          submit(value);
        }}
        value={picklistValue}
        label="Select Building"
        hideLabel
        variant="bare"
      >
        {props.options &&
          props.options.map((option, index) => {
            return <Option key={index} name={option} label={option} />;
          })}
      </Picklist>
    </div>
  );
});

export default DropDown;
