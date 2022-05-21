import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  ModalFooter,
} from "shards-react";
import { FlightDataContext } from "../contexts/flightDataContext";
import Button from "./button";
import SeatChooser from "./seatChooser";

class TicketingModal extends Component {
  static contextType = FlightDataContext;
  constructor(props) {
    super(props);
    this.state = {
      seats: [],
      edited: false,
      seatClicked: false,
    };
    this.getSeats = this.getSeats.bind(this);
    this.handleCloseOnly = this.handleCloseOnly.bind(this);
  }

  componentDidMount() {
    let editedt = this.context.state.bookedFlights.some(
      (x) => x.direction == this.props.direction
    );
    this.setState({
      seats:
        this.context.state.seatsChosen.find(
          (x) => x.type == this.props.direction
        )?.selectedSeats || [],
      edited: editedt,
    });
  }

  componentDidUpdate() {
    if (
      this.state.seatClicked &&
      this.context.state.bookedFlights.some(
        (x) => x.direction == this.props.direction
      )
    ) {
      this.setState({
        edited: true,
        seatClicked: false,
      });
    }
  }

  getSeats(seatObj) {
    this.setState({
      seatClicked: true,
      seats: [...seatObj],
    });
  }

  handleCloseOnly() {
    this.setState({
      seats: [],
    });
    this.props.close();
  }

  render() {
    const { Id, DepartureLocation, FlightName, Time, Price } =
      this.context.state.flightViewing;
    return (
      <Modal
        size="lg"
        open={this.props.open}
        toggle={() => {
          return;
        }}
      >
        <ModalHeader>Confirm Booking</ModalHeader>
        <ModalBody>
          <div class="d-flex flex-row justify-content-around">
            <div class="d-flex flex-column align-items-between">
              <div>
                <h3>{FlightName}</h3>
                <h5>{Time}</h5>
                <h5>Arrives At {DepartureLocation}</h5>
                <h5>Tickets: {this.state.seats.length}</h5>
                <div class="d-flex justify-content-start flex-wrap">
                  <h5>Seats: </h5>
                  <div>
                    {this.state.seats.map((x) => (
                      <Badge style={{ marginLeft: "2px", marginRight: "2px" }}>
                        {x}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <SeatChooser
              id={Id}
              seats={this.state.seats}
              getSeats={this.getSeats}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <h4>Total: S${(this.state.seats.length * Price).toFixed(2)}</h4>
          {this.context.state.bookedFlights.some((v) => v.rowToAdd.Id == Id) ? (
            <Button
              onClick={() => {
                this.props.cancel(Id);
                this.props.close();
              }}
              outline
              theme="danger"
            >
              Cancel Booking
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (this.state.seats.length == 0) {
                  this.props.cancel(Id);
                  this.handleCloseOnly();
                  return;
                } else if (
                  !this.context.state.bookedFlights.some(
                    (x) => x.rowToAdd.Id == Id
                  )
                ) {
                  this.props.cancel(Id);
                  this.handleCloseOnly();
                  return;
                }
                this.props.close();
              }}
              theme="danger"
            >
              Close
            </Button>
          )}
          <Button
            onClick={() => {
              this.context.updateSeatChosen(
                this.state.seats,
                this.props.direction
              );
              this.context.bookFlights(
                Id,
                this.state.seats,
                this.props.direction
              );
              this.handleCloseOnly();
            }}
            disabled={this.state.seats.length == 0}
            block
          >
            {this.state.edited ? "Update Changes" : "Book Flight"}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default TicketingModal;
