import { DateInput, TextInput, Select } from "grommet";
import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import FlightTable from "./FlightTable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Nav from "react-bootstrap/Nav";
import { ButtonGroup, FormCheckbox, FormSelect } from "shards-react";
import Button from "./button";
import moment from "moment";
import { Switch } from "antd";
import TextField from "@mui/material/TextField";
import { Picklist, PicklistOption, DatePicker } from "react-rainbow-components";
import { FlightDataContext } from "../contexts/flightDataContext";

export default class FindFlightPanel extends Component {
  static contextType = FlightDataContext;
  constructor(props) {
    super(props);
    this.state = {
      journeyType: "Two-way",
      startDate: new Date(),
      endDate: new Date(),
      departureLocation: null,
      arrivalLocation: null,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleJourneyType = this.toggleJourneyType.bind(this);
    this.handleDestinationSelect = this.handleDestinationSelect.bind(this);
  }

  handleDateChange(x, date) {
    if (x === "start") {
      this.setState({
        startDate: new Date(date),
      });
    } else if (x === "end") {
      this.setState({
        endDate: new Date(date),
      });
    }
  }

  toggleJourneyType() {
    this.setState({
      journeyType: this.state.journeyType === "Two-way" ? "One-way" : "Two-way",
    });
  }

  handleDestinationSelect(type, location) {
    if (type === "Arrival") {
      this.setState({
        arrivalLocation: location,
      });
    } else {
      this.setState({
        departureLocation: location,
      });
    }
  }

  componentDidMount() {
    this.setState({
      departureLocation: this.context.destinations[0],
      arrivalLocation: this.context.destinations[1],
    });
  }

  render() {
    const { destinations } = this.context;

    return (
      <div class="d-flex flex-column">
        <Tab.Container
          defaultActiveKey="Two-way"
          activeKey={this.state.journeyType}
        >
          <div className="m-2 d-flex flex-row justify-content-center">
            {this.state.journeyType === "Two-way" ? (
              <Button onClick={null}>Two-way</Button>
            ) : (
              <Button outline onClick={this.toggleJourneyType}>
                Two-way
              </Button>
            )}
            {this.state.journeyType === "One-way" ? (
              <Button onClick={null}>One-way</Button>
            ) : (
              <Button outline onClick={this.toggleJourneyType}>
                One-way
              </Button>
            )}
          </div>
          <Tab.Content>
            <Tab.Pane eventKey="Two-way">
              <div class="d-flex p-5 flex-row justify-content-center align-items-end">
                <h4>I am departing on </h4>
                <div
                  style={{
                    maxWidth: "22vw",
                    borderLeft: 0,
                    borderRight: 0,
                    borderTop: 0,
                    borderBottom: "3px solid",
                  }}
                  class="d-flex flex-row inline-flex justify-content-around align-items-center"
                >
                  <TextInput
                    style={{
                      borderRadius: 0,
                      border: 0,
                      outlineStyle: "none",
                      boxShadow: "none",
                      outline: "none",
                    }}
                    value={moment(this.state.startDate.toISOString()).format(
                      "dddd, Do MMM YYYY"
                    )}
                  />
                  <DateInput
                    size="small"
                    value={this.state.startDate.toISOString()}
                    placeholder="DD/MM/YYYY"
                    onChange={({ value }) =>
                      this.handleDateChange("start", value)
                    }
                  />
                </div>
                <h4> and returning on </h4>
                <div
                  style={{
                    maxWidth: "22vw",
                    borderLeft: 0,
                    borderRight: 0,
                    borderTop: 0,
                    borderBottom: "3px solid",
                  }}
                  class="d-flex flex-row inline-flex justify-content-around align-items-center"
                >
                  <TextInput
                    style={{
                      borderRadius: 0,
                      border: 0,
                      outlineStyle: "none",
                      boxShadow: "none",
                      outline: "none",
                    }}
                    value={moment(this.state.endDate.toISOString()).format(
                      "dddd, Do MMM YYYY"
                    )}
                  />
                  <DateInput
                    size="small"
                    value={this.state.endDate.toISOString()}
                    placeholder="DD/MM/YYYY"
                    onChange={({ value }) =>
                      this.handleDateChange("end", value)
                    }
                  />
                </div>
              </div>
              <div class="d-flex flex-row">
                <div class="d-flex p-5 justify-content-start flex-column">
                  <h3>Departure</h3>
                  <h4>
                    {moment(this.state.startDate.toISOString()).format(
                      "dddd, Do MMM YYYY"
                    )}{" "}
                    to
                  </h4>
                  <div class="d-flex flex-row" style={{ maxWidth: "35vw" }}>
                    <Select
                      size="small"
                      options={destinations}
                      value={this.state.departureLocation}
                      onChange={(v) =>
                        this.handleDestinationSelect("Departure", v.option)
                      }
                    />
                  </div>
                </div>
                <FlightTable
                  direction="departure"
                  departureLocation={this.state.departureLocation}
                  departureDate={this.state.startDate}
                />
              </div>
              <div class="d-flex flex-row">
                <FlightTable
                  direction="return"
                  departureLocation={this.state.arrivalLocation}
                  departureDate={this.state.startDate}
                />
                <div class="d-flex p-5 justify-content-start flex-column">
                  <h3>Return</h3>
                  <h4>
                    {moment(this.state.endDate.toISOString()).format(
                      "dddd, Do MMM YYYY"
                    )}{" "}
                    to
                  </h4>
                  <div class="d-flex flex-row" style={{ maxWidth: "35vw" }}>
                    <Select
                      size="small"
                      options={
                        destinations.filter(
                          (x) => x != this.state.departureLocation
                        ) || destinations[1]
                      }
                      value={this.state.arrivalLocation}
                      onChange={(v) =>
                        this.handleDestinationSelect("Arrival", v.option)
                      }
                    />
                  </div>
                </div>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="One-way">
              <div class="d-flex flex-row justify-content-center align-items-end">
                <h4>I am departing on </h4>
                <div
                  style={{
                    maxWidth: "22vw",
                    borderLeft: 0,
                    borderRight: 0,
                    borderTop: 0,
                    borderBottom: "3px solid",
                  }}
                  class="d-flex flex-row inline-flex justify-content-around align-items-center"
                >
                  <TextInput
                    style={{
                      borderRadius: 0,
                      border: 0,
                      outlineStyle: "none",
                      boxShadow: "none",
                      outline: "none",
                    }}
                    value={moment(this.state.startDate.toISOString()).format(
                      "dddd, Do MMM YYYY"
                    )}
                  />
                  <DateInput
                    size="small"
                    value={this.state.startDate.toISOString()}
                    placeholder="DD/MM/YYYY"
                    onChange={({ value }) =>
                      this.handleDateChange("start", value)
                    }
                  />
                </div>
              </div>
              <div class="d-flex flex-row">
                <div class="d-flex p-5 justify-content-start flex-column">
                  <h3>Departure</h3>
                  <h4>
                    {moment(this.state.startDate.toISOString()).format(
                      "dddd, Do MMM YYYY"
                    )}{" "}
                    to
                  </h4>
                  <div class="d-flex flex-row" style={{ maxWidth: "35vw" }}>
                    <Select
                      size="small"
                      options={destinations}
                      value={this.state.departureLocation}
                      onChange={(v) =>
                        this.handleDestinationSelect("Departure", v.option)
                      }
                    />
                  </div>
                </div>
                <FlightTable
                  direction="return"
                  departureLocation={this.state.arrivalLocation}
                  departureDate={this.state.endDate}
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}
