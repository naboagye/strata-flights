import React from "react";
import styled from "styled-components";
import cancel from "images/cancel.png";

export const CancelBox = styled.button`
  padding: 1px 1.28px 2.28px 2px;
  position: relative;
`;
export const CancelBtn = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.theme.colors.teal};
  border-radius: 8px;
  position: relative;
`;
export const Icons8Plus1 = styled.img`
  position: absolute;
  left: 0;
  top: 0;
`;

const Cancel = (props) => {
  return (
    <CancelBox onClick={props.onClick}>
      <CancelBtn />
      <Icons8Plus1 alt="search" src={cancel} />
    </CancelBox>
  );
};

export default Cancel;
