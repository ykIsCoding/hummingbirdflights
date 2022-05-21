import { Component } from "react";
import AllPageNavbar from "../components/navbar";
import SiteFooter from "../components/siteFooter";

export default class PageTemplate extends Component {
  render() {
    return (
      <div style={{ minHeight: "100vh" }} class="d-flex flex-column">
        <div class="flex-shrink-0">
          <AllPageNavbar />
        </div>
        <div class="d-flex flex-grow-1 flex-column align-items-stretch">
          {this.props.children}
        </div>
        <div class="flex-shrink-0">
          <SiteFooter />
        </div>
      </div>
    );
  }
}
