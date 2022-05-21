import React from "react";
import { Button, Tooltip } from "shards-react";
import { Paper } from "@mui/material";
import { FlightDataContext } from "../contexts/flightDataContext";
import SeatLegend from "./seatLegend";
export default class SeatChooser extends React.Component {
  static contextType = FlightDataContext;

  constructor(props) {
    super(props);
    this.state = {
      toolTipSeat: null,
    };
    this.toggleToolTip = this.toggleToolTip.bind(this);
  }

  toggleToolTip(seatName) {
    this.setState({
      toolTipSeat: this.state.toolTipSeat != null ? null : seatName,
    });
  }

  toggleSeat(seatName) {
    let tempSeats = this.props.seats;
    if (!tempSeats.includes(seatName)) {
      tempSeats.push(seatName);
    } else {
      tempSeats = tempSeats.filter((x) => x != seatName);
    }
    this.context.registerEdit(this.props.id);
    this.props.getSeats(tempSeats);
  }

  render() {
    const seats = [
      [
        { name: "A1", status: "available" },
        { name: "B1", status: "available" },
        { name: "C1", status: "available" },
        { name: "D1", status: "unavailable" },
      ],
      [{ type: "walkway" }],
      [
        { name: "A2", status: "available" },
        { name: "B2", status: "available" },
        { name: "C2", status: "available" },
        { name: "D2", status: "available" },
      ],
    ];
    const { seatslegendlist } = this.context;
    return (
      <div class="d-flex flex-column justify-content-center">
        <div class="d-flex flex-row justify-content-center">
          <div>
            <div class="d-flex flex-row justify-content-center">
              <h6>front</h6>
            </div>
            <div class="d-flex flex-row justify-content-between">
              {seats.map((x, i) => (
                <div
                  style={{
                    minWidth: "3vw",
                    background: x[0].type == "walkway" ? "grey" : "blue",
                  }}
                  class="d-flex flex-column justify-content-between"
                >
                  {x[0].type == "walkway"
                    ? null
                    : x.map((t) => (
                        <div>
                          <Button
                            id={`${t.name}`}
                            key={t.name}
                            onClick={(value) => this.toggleSeat(t.name)}
                            disabled={t.status === "unavailable"}
                            style={{
                              background: this.props.seats.some(
                                (x) => x == t.name
                              )
                                ? seatslegendlist.find(
                                    (x) => x.name == "reserved"
                                  ).color
                                : seatslegendlist.find(
                                    (x) => x.name == t.status
                                  ).color,
                              margin: "10px",
                            }}
                          >
                            {t.name}
                          </Button>
                          <Tooltip
                            open={this.state.toolTipSeat === t.name}
                            target={`#${t.name}`}
                            toggle={() => this.toggleToolTip(t.name)}
                          >
                            {t.status}
                          </Tooltip>
                        </div>
                      ))}
                </div>
              ))}
            </div>
            <div class="m-1 flex-row flex-fill">
              <Paper square variant="outlined">
                <div class="m-1">
                  <h6>Legend</h6>
                  <SeatLegend />
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
