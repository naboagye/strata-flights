import React from "react";
import { DatePicker } from "react-rainbow-components";

export default class Example extends React.Component {
  state = {
    date: this.props.setDate === undefined ? new Date() : this.props.setDate,
    today: new Date(),
  };

  submit = (keyword) => {
    if (typeof this.props.search === "function") {
      this.props.search(keyword);
    }
  };

  containerStyles = {
    maxWidth: "100%",
    isBare: true,
  };

  render() {
    return (
      <div
        className="rainbow-p-vertical_large rainbow-p-horizontal_xx-large rainbow-m-horizontal_xx-large"
        style={this.containerStyles}
      >
        <DatePicker
          formatStyle="small"
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
        />
      </div>
    );
  }
}
