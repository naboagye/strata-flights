import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import styled, { css } from "styled-components";
import RangeSlider from "components/forms/RangeSlider.js";

// const useStyles = makeStyles((theme) => ({
//   typography: {
//     padding: theme.spacing(2),
//   },
// }));

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

export default function PopoverSlider(props) {
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
