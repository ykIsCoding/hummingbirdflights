import { Component, useContext, useEffect, useState } from "react";
import FindFlightPanel from "../components/findFlightPanel";
import PageTemplate from "./pageTemplate";
import { List } from "grommet";
import Button from "../components/button";
import {
  FormSelect,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
} from "shards-react";
import { FlightDataContext } from "../contexts/flightDataContext";
import { touchRippleClasses } from "@mui/material";

const FlightBookingPage = () => {
  return (
    <FlightDataContext.Consumer>
      {({ state, getSeatsChosenByDirection, getTotalPrice }) => (
        <PageTemplate>
          <div class="d-flex p-5 justify-content-center flex-row">
            <h2>Book Flights</h2>
          </div>
          <FindFlightPanel />
          <div class="d-flex p-5 flex-row justify-content-center">
            {state.bookedFlights.length > 0 && (
              <Card style={{ width: "80vw", borderRadius: 0 }}>
                <CardHeader>Booking Summary</CardHeader>
                <CardBody>
                  <div class="d-flex flex-row justify-content-around">
                    {state.bookedFlights
                      .sort((a, b) => (a.direction == "return" ? 1 : -1))
                      .map((f) => {
                        return (
                          <Card
                            style={{
                              width: "30vw",
                              maxWidth: "30vw",
                              borderRadius: 0,
                            }}
                          >
                            <CardBody>
                              <h4>
                                {f.direction[0].toUpperCase() +
                                  f.direction.slice(1)}
                              </h4>
                              <div class="d-flex flex-row justify-content-between">
                                <h6>{f.rowToAdd.FlightName}</h6>
                                <h6>${f.rowToAdd.Price}/Ticket</h6>
                              </div>
                              <div class="d-flex flex-row justify-content-between">
                                <div>Seats</div>
                                <div class="d-flex flex-row flex-wrap justify-content-end">
                                  {getSeatsChosenByDirection(f.direction).map(
                                    (x) => (
                                      <Badge style={{ margin: "2px" }}>
                                        {x}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            </CardBody>
                            <CardFooter>
                              <div class="d-flex flex-row align-items-center justify-content-between p-1">
                                <h6>Sub-total</h6>
                                <h5>
                                  $
                                  {(
                                    f.rowToAdd.Price *
                                    getSeatsChosenByDirection(f.direction)
                                      .length
                                  ).toFixed(2)}
                                </h5>
                              </div>
                            </CardFooter>
                          </Card>
                        );
                      })}
                  </div>
                </CardBody>
                <div class="d-flex p-5 flex-row justify-content-between align-items-center">
                  <h4>Total: ${getTotalPrice()}</h4>
                  <Button>Proceed to Payment</Button>
                </div>
              </Card>
            )}
          </div>
        </PageTemplate>
      )}
    </FlightDataContext.Consumer>
  );
};

export default FlightBookingPage;
