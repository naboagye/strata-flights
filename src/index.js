import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "GlobalStyles";
import theme from "stylesheet.js";

Modal.setAppElement("#root");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
