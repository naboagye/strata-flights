import React, { useState } from "react";
import { DatePicker } from "react-rainbow-components";
import SearchContainerComponent from "components/cards/SearchContainerComponent.js";
//import "./style.css";

export default class Example extends React.Component {
  state = {
    date: this.props.setDate === undefined ? new Date() : this.props.setDate,
    today: new Date(),
  };

  submit = (keyword) => {
    if (typeof this.props.search === "function") {
      this.props.search(keyword);
    }
    //console.log(this.state.date);
  };
  containerStyles = {
    maxWidth: 150,
    isBare: true,
  };

  render() {
    return (
      <div
        className="rainbow-p-vertical_large rainbow-p-horizontal_xx-large rainbow-m-horizontal_xx-large"
        style={this.containerStyles}
      >
        <DatePicker
          value={this.state.date}
          minDate={this.state.today}
          maxDate={
            new Date(
              this.state.today.getFullYear() + 1,
              this.state.today.getMonth(),
              this.state.today.getDate()
            )
          }
          label="DatePicker Label"
          hideLabel={true}
          onChange={(value) => {
            this.setState({ date: value });
            this.submit({ value });
          }}
          //onBlur={(value) => this.submit({ value })}
        />
      </div>
    );
  }
}
