import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import styled, { css } from "styled-components";
import RangeSlider from "components/forms/RangeSlider.js";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const StyledPopover = styled.div`
  margin-top: 1px;
  margin-right: 14px;
  border-radius: 10px;
  padding: 7px 6.72px 5.72px 15px;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.selected
      ? css`
           linear-gradient(
            270deg,
            ${(props) => props.theme.colors.dodgerBlue2} 11%,
            ${(props) => props.theme.colors.dodgerBlue3} 23%,
            ${(props) => props.theme.colors.dodgerBlue} 50%
          );
        `
      : props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gainsboro};
`;

const MaxStops = styled.p`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.white
      : props.theme.colors.darkSlateGray};
  margin-right: 17px;
  letter-spacing: 0.2px;
  font-family: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.family
      : props.theme.fonts.nunito13SemiBold.family};
  font-size: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.size
      : props.theme.fonts.nunito13SemiBold.size};
  font-weight: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.weight
      : props.theme.fonts.nunito13SemiBold.weight};
  line-height: ${(props) =>
    props.selected
      ? props.theme.fonts.nunito13Bold.lineHeight
      : props.theme.fonts.nunito13SemiBold.lineHeight};
`;

export default function PopoverSlider(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [outbound, setOutbound] = React.useState([0, 23]);
  const [inbound, setInbound] = React.useState([0, 23]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    submit();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function getTimes(outbound, inbound) {
    setOutbound(outbound);
    setInbound(inbound);
  }

  function submit() {
    if (typeof props.search === "function") {
      props.search(outbound, inbound);
    }
    //console.log(keyword);
  }

  return (
    <div>
      <StyledPopover aria-describedby={id} onClick={handleClick}>
        {props.children}
      </StyledPopover>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <RangeSlider search={getTimes} outbound={outbound} inbound={inbound} />
      </Popover>
    </div>
  );
}
