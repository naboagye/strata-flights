import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CheckboxGroup } from "react-rainbow-components";

const useStyles = makeStyles({
  root: {
    width: 500,
    padding: "20px 20px 20px 20px",
  },
});

const options = [
  { value: "checkboxOne", label: "Checkbox One", disabled: false },
  { value: "checkboxTwo", label: "Checkbox Two", disabled: false },
  { value: "checkboxThree", label: "Checkbox Three", disabled: false },
];

export default function Checkbox(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState([]);

  const handleOnChange = (values) => {
    setValues(values);
    submit(values);
  };

  function submit(values) {
    if (typeof props.search === "function") {
      props.search(values);
    }
  }

  return (
    <div className={classes.root}>
      <CheckboxGroup
        id="checkbox-group-1"
        label="Airlines"
        options={options}
        value={values}
        onChange={handleOnChange}
      />
    </div>
  );
}
