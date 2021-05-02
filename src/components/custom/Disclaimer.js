import React from "react";
import { HelpText } from "react-rainbow-components";

const style = { width: "250px" };

export default () => {
  return (
    <HelpText
      title="Disclaimer"
      text={
        <p style={style}>
          Information presented here is purely advisory and may not always be
          entirely accurate and up to date. Official government websites should
          always be used as a first port of call.
        </p>
      }
    />
  );
};
