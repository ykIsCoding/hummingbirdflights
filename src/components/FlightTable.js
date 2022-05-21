import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { Component } from "react";
import Button from "./button";
import { FlightDataContext } from "../contexts/flightDataContext";
import TicketingModal from "./ticketingModal";
import { GiThunderSkull } from "react-icons/gi";

const seatFilter = (seatArr, condition = true) => {
  var count = 0;
  seatArr.map((x) => {
    count += x.filter((x) => x.type == "seat" && x.status != condition).length;
  });
  return count;
};

export default class FightTable extends Component {
  static contextType = FlightDataContext;
  static contextType = FlightDataContext;
  constructor(props) {
    super(props);
    this.state = {
      flightId: null,
      modalOpen: false,
      flightChosen: null,
    };
    this.toggleBookingConfirmModal = this.toggleBookingConfirmModal.bind(this);
    this.closeBookingConfirmModal = this.closeBookingConfirmModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  toggleBookingConfirmModal(e, id) {
    this.context.setFlightViewing(id);
    let fc = this.context.getFlightById(id);
    this.setState({
      flightId: id,
      flightChosen: fc,
      modalOpen: this.state.modalOpen ? false : true,
    });
  }

  closeBookingConfirmModal() {
    this.setState({
      modalOpen: false,
    });
  }

  handleCancel(flightId) {
    this.context.unsetBookedFlights(flightId, this.props.direction);
    this.context.updateSeatChosen([]);
    this.setState({
      flightId: null,
      flightChosen: null,
    });
  }

  componentDidMount() {
    this.setState({
      flightChosen: this.context.state.bookedFlights.find(
        (x) => x.direction == this.props.direction
      ),
    });
  }

  render() {
    let value = this.context;
    const tableHeading = ["Time", "Capacity", "Price"];
    return (
      <div class="p-5">
        {this.state.modalOpen && (
          <TicketingModal
            direction={this.props.direction}
            flightData={this.state.flightChosen}
            cancel={this.handleCancel}
            open={this.state.modalOpen}
            close={this.closeBookingConfirmModal}
          />
        )}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Flight No.</TableCell>
                {tableHeading.map((r) => (
                  <TableCell align="right">{r}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {value.state.allFlights
                .filter(
                  (x) =>
                    x.DepartureLocation == this.props.departureLocation &&
                    x.Day.getDate() ==
                      new Date(this.props.departureDate).getDate()
                )
                .map((row) => {
                  return (
                    <TableRow
                      key={row.Id}
                      style={{
                        backgroundColor:
                          this.context.state.bookedFlights.some(
                            (x) => x.rowToAdd.Id === row.Id
                          ) && "#FFD523",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.FlightName}
                      </TableCell>
                      <TableCell align="right">{row.Time}</TableCell>
                      <TableCell align="right">
                        {seatFilter(row.seats, "available")}/
                        {seatFilter(row.seats)}
                      </TableCell>
                      <TableCell align="right">{row.Price}</TableCell>
                      <TableCell align="right">
                        {seatFilter(row.seats, "unavailable") == 0 ? (
                          <Button disabled>Book</Button>
                        ) : this.context.state.bookedFlights.some(
                            (x) => x.rowToAdd.Id === row.Id
                          ) ? (
                          <div class="d-flex flex-row justify-content-end">
                            <Button
                              onClick={(v) =>
                                this.toggleBookingConfirmModal(v, row.Id)
                              }
                              style={{ margin: "2px" }}
                            >
                              View
                            </Button>
                            <Button
                              onClick={() => this.handleCancel(row.Id)}
                              style={{ margin: "2px" }}
                              outline
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            disabled={
                              this.state.flightChosen == null
                                ? false
                                : this.state.flightChosen.Id != row.Id
                                ? true
                                : false
                            }
                            onClick={(v) =>
                              this.toggleBookingConfirmModal(v, row.Id)
                            }
                          >
                            Book
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
