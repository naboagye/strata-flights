import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 500,
    padding: "20px 20px 20px 20px",
  },
});

const AirbnbSlider = withStyles({
  root: {
    color: "#2DAAE2",
    height: 3,
    padding: "13px 0",
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

const marks = [
  {
    value: 0,
    label: "00:00",
  },
  {
    value: 1,
    label: "01:00",
  },
  {
    value: 2,
    label: "02:00",
  },
  {
    value: 3,
    label: "03:00",
  },
  {
    value: 4,
    label: "04:00",
  },
  {
    value: 5,
    label: "05:00",
  },
  {
    value: 6,
    label: "06:00",
  },
  {
    value: 7,
    label: "07:00",
  },
  {
    value: 8,
    label: "08:00",
  },
  {
    value: 9,
    label: "09:00",
  },
  {
    value: 10,
    label: "10:00",
  },
  {
    value: 11,
    label: "11:00",
  },
  {
    value: 12,
    label: "12:00",
  },
  {
    value: 13,
    label: "13:00",
  },
  {
    value: 14,
    label: "14:00",
  },
  {
    value: 15,
    label: "15:00",
  },
  {
    value: 16,
    label: "16:00",
  },
  {
    value: 17,
    label: "17:00",
  },
  {
    value: 18,
    label: "18:00",
  },
  {
    value: 19,
    label: "19:00",
  },
  {
    value: 20,
    label: "20:00",
  },
  {
    value: 21,
    label: "21:00",
  },
  {
    value: 22,
    label: "22:00",
  },
  {
    value: 23,
    label: "23:00",
  },
];

function getIndex(value) {
  return marks.findIndex((obj) => obj.value === value);
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [outbound, setOutbound] = React.useState(props.outbound || [0, 23]);
  const [inbound, setInbound] = React.useState(props.inbound || [0, 23]);

  const handleChange = (event, newValue) => {
    setOutbound(newValue);
    //console.log(outbound);
  };

  const handleChange2 = (event, newValue) => {
    setInbound(newValue);
    //console.log(inbound);
  };

  function submit() {
    if (typeof props.search === "function") {
      props.search(outbound, inbound);
    }
    //console.log(keyword);
  }

  return (
    <div className={classes.root}>
      <Typography gutterBottom>Outbound</Typography>
      <Typography gutterBottom>
        {marks[getIndex(outbound[0])].label} -{" "}
        {marks[getIndex(outbound[1])].label}
      </Typography>
      <AirbnbSlider
        ThumbComponent={AirbnbThumbComponent}
        marks={marks.value}
        value={outbound}
        onChange={handleChange}
        onChangeCommitted={submit}
        step={1}
        min={0}
        max={23}
        getAriaLabel={(index) =>
          index === 0 ? "Minimum price" : "Maximum price"
        }
        valueLabelDisplay="on"
        //defaultValue={outbound}
      />
      <Typography gutterBottom>Inbound</Typography>
      <Typography gutterBottom>
        {marks[getIndex(inbound[0])].label} -{" "}
        {marks[getIndex(inbound[1])].label}
      </Typography>
      <AirbnbSlider
        ThumbComponent={AirbnbThumbComponent}
        marks={marks.value}
        value={inbound}
        onChange={handleChange2}
        onChangeCommitted={submit}
        step={1}
        min={0}
        max={23}
        getAriaLabel={(index) =>
          index === 0 ? "Minimum price" : "Maximum price"
        }
        valueLabelDisplay="on"
        defaultValue={inbound}
      />
    </div>
  );
}
