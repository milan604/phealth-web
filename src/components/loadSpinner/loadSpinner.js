import { Spin } from "antd";
import React, { Component } from "react";
class LoadingSpinner extends Component {
  render() {
    return (
      <div id="loading">
        <Spin size="large" />
      </div>
    );
  }
}
export default LoadingSpinner;
