import { render } from "@testing-library/react";
import React, { Component } from "react";
import { Button as SRButton } from "shards-react";
import "../../src/App.css";

export default class Button extends Component {
  render() {
    return this.props.outline ? (
      <SRButton
        {...this.props}
        className={this.props.theme ? null : "button"}
        style={{
          ...this.props.style,
        }}
        squared
      >
        <div class="d-flex justify-content-center align-items-center">
          {this.props.children}
        </div>
      </SRButton>
    ) : (
      <SRButton
        {...this.props}
        className={this.props.theme ? null : "nobutton"}
        style={{
          ...this.props.style,
        }}
        squared
      >
        <div class="d-flex justify-content-center align-items-center">
          {this.props.children}
        </div>
      </SRButton>
    );
  }
}
