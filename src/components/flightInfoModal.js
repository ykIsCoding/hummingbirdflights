import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, Badge } from "shards-react";
import Button from "./button";

export default class FlightInfoModal extends Component {
  render() {
    return (
      <Modal
        style={{ borderRadius: 0 }}
        open={this.props.open}
        toggle={this.props.toggleModal}
      >
        <ModalHeader>Flight Information</ModalHeader>
        <ModalBody>
          <h4>
            {this.props.search[0].Airport} to {this.props.search[1].Airport}
          </h4>
          <br />
          <div class="flex-d">
            <h5>
              Flight Time: <Badge>2h 30 m</Badge>{" "}
            </h5>
            <h5>
              Flights/Week: <Badge>5</Badge>
            </h5>
            <h5>
              Cheapest Price (One Way): <Badge>$700</Badge>
            </h5>
            <h5>
              Aircraft Used: <Badge>PA-46 Malibu</Badge>{" "}
              <Badge>PA-32 Cherokee Six</Badge>
            </h5>
            <br />
          </div>
        </ModalBody>
        <div class="flex-row justify-content-center">
          <div class="">
            <Button
              style={{ margin: 10 }}
              block
              onClick={this.props.toggleModal}
              outline
            >
              Okay
            </Button>
          </div>
          <div class="">
            <Button
              style={{ margin: 10 }}
              block
              onClick={this.props.toggleModal}
            >
              Find Tickets
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
