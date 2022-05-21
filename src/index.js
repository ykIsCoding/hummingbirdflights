import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Grommet, grommet } from "grommet";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTrackedFlightsPage from "./pages/AllTrackedFlightsPage";
import TrackedFlightPage from "./pages/trackedFlightPage";
import AboutUsPage from "./pages/aboutUsPage";
import FlightBookingPage from "./pages/flightBookingPage";
import { FlightDataProvider } from "./contexts/flightDataContext";
import { SiteThemeContext } from "./contexts/siteThemeContext";

ReactDOM.render(
  <FlightDataProvider>
    <Grommet theme={SiteThemeContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/flighttracker/all"
            element={<AllTrackedFlightsPage />}
          />
          <Route
            path="/flighttracker/:flightNumber"
            element={<TrackedFlightPage />}
          />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/bookflights" element={<FlightBookingPage />} />
        </Routes>
      </BrowserRouter>
    </Grommet>
  </FlightDataProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
