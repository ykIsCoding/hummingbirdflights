import React from "react";
import { GiConsoleController } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid";


const aircrafts =["Piper","McDonnell"]
const destinations = ["Rio Grande, New Zealand", "Falkland Islands"];

var tableRows = [
  {
    Id: uuidv4(),
    Aircraft:aircrafts[0],
    Status: "Scheduled",
    DepartureLocation: destinations[0],
    ArrivalLocation:destinations[1],
    FlightName: "HAT125",
    Time: "230pm",
    Duration: "2h 30 min",
    Price: 500,
    Day: new Date("2021/12/29"),
    seats: [
      [
        { type: "seat", name: "A1", status: "available" },
        { type: "seat", name: "B1", status: "available" },
        { type: "seat", name: "C1", status: "available" },
        { type: "seat", name: "D1", status: "unavailable" },
      ],
      [{ type: "walkway" }],
      [
        { type: "seat", name: "A2", status: "available" },
        { type: "seat", name: "B2", status: "available" },
        { type: "seat", name: "C2", status: "available" },
        { type: "seat", name: "D2", status: "available" },
      ],
    ],
  },
];

const seatslegendlist = [
  { name: "available", color: "#2FDD92" },
  { name: "unavailable", color: "#DDDDDD" },
  { name: "reserved", color: "#FFD523" },
];

const providerValues = {
  destinations,
  tableRows,
  seatslegendlist,
};

function changeSeatStatus(flightId, seatNames, status) {
  let tempRow = tableRows.find((x) => x.Id == flightId);

  tempRow.seats.map((arr) => {
    arr.map((o) => {
      if (o.type == "seat" && seatNames.indexOf(o.name) != -1) {
        o.status = status;
      }
      return o;
    });
    return arr;
  });

  return tempRow;
}

const FlightDataContext = React.createContext();

class FlightDataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFlights: [],
      bookedFlights: [],
      flightViewing: null,
      seatsChosen: [],
    };
    this.setBookedFlights = this.setBookedFlights.bind(this);
    this.unsetBookedFlights = this.unsetBookedFlights.bind(this);
    this.setFlightViewing = this.setFlightViewing.bind(this);
    this.updateSeatChosen = this.updateSeatChosen.bind(this);
    this.getSeatsChosenByDirection = this.getSeatsChosenByDirection.bind(this);
    this.registerEdit = this.registerEdit.bind(this);
    this.getSeatList = this.getSeatList.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.getPassengerCountByFlightName = this.getPassengerCountByFlightName.bind(this)
    this.getFlightByFlightName = this.getFlightByFlightName.bind(this)
  }

  componentDidMount() {
    this.setState({
      allFlights: [...tableRows],
    });
  }

  getDepartureFlightId() {
    return this.state.bookedFlights.find((x) => x.direction == "departure")?.Id;
  }

  updateSeatChosen(seatArr, direction) {
    if (seatArr.length == 0) {
      return;
    } else {
      this.setState({
        flightViewing: null,
        seatsChosen: [
          ...this.state.seatsChosen,
          { type: direction, selectedSeats: [...seatArr] },
        ],
      });
    }
  }

  getSeatsChosenByDirection(direction) {
    return this.state.seatsChosen.find((x) => x.type == direction)
      .selectedSeats;
  }

  setFlightViewing(flightId) {
    this.setState({
      flightViewing: tableRows.find((x) => x.Id === flightId),
    });
  }

  getTotalPrice() {
    var price = 0;
    this.state.bookedFlights.map((x) => (price += x.rowToAdd.Price));
    return price.toFixed(2);
  }

  setBookedFlights(flightId, selectedSeats, direction = "departure") {
    let changedRow = tableRows.filter((x) => x.Id != flightId);
    let rowToAdd = changeSeatStatus(flightId, selectedSeats, "unavailable");
    changedRow.push(rowToAdd);

    this.setState(
      {
        allFlights: [...changedRow],
        flightViewing: null,
        bookedFlights: [
          ...this.state.bookedFlights.filter(
            (x) => x.rowToAdd.Id != rowToAdd.Id
          ),
          { direction, rowToAdd, edited: true },
        ],
      },
      console.log(this.state.bookedFlights)
    );
  }

  registerEdit(flightId) {
    if (!this.state.bookedFlights.some((x) => x.rowToAdd.Id == flightId))
      return false;
    let temp = this.state.bookedFlights;
    let temprow = temp.find((x) => x.rowToAdd.Id == flightId);
    temp = temp.filter((x) => x.rowToAdd.Id != flightId);
    temprow.edited = true;
    temp.push(temprow);
    this.setState({
      bookedFlights: [...temp],
    });
    return true;
  }

  unsetBookedFlights(flightId, direction) {
    //edit here
    this.setState({
      seatsChosen: this.state.seatsChosen.filter((x) => x.type != direction),
      flightViewing: null,
      bookedFlights: this.state.bookedFlights.filter(
        (x) => x.rowToAdd.Id !== flightId
      ),
    });
  }

  getFlightById(flightId) {
    return this.state.allFlights.find((x) => x.Id == flightId);
  }

  getFlightByFlightName(flightName){
    return this.state.allFlights.find((x) => x.FlightName == flightName);
  }

  getSeatList(firstKey, direction) {
    //edit here
    let temp = this.state.seatsChosen.find(
      (x) => x.type == direction
    ).selectedSeats;
    temp.map((x) => {
      return x;
    });
    return [...temp];
  }

  getPassengerCountByFlightName(flightName){
    var seatsTaken =0
    var seatsArr = this.state.allFlights.find((x) => x.FlightName === flightName).seats
    seatsArr.map(x=>
        x.forEach(p=>{
            if(p.type==='seat' && p.status==='unavailable'){
                 seatsTaken+=1
            }
            return p
        })
    )
    return seatsTaken
  }

  getFlightViewingId() {
    return;
  }

  render() {
    providerValues.state = this.state;
    providerValues.getFlightById = this.getFlightById;
    providerValues.getDepartureFlightId = this.getDepartureFlightId;
    providerValues.bookFlights = this.setBookedFlights;
    providerValues.unsetBookedFlights = this.unsetBookedFlights;
    providerValues.setFlightViewing = this.setFlightViewing;
    providerValues.updateSeatChosen = this.updateSeatChosen;
    providerValues.getSeatsChosenByDirection = this.getSeatsChosenByDirection;
    providerValues.getFlightViewingId = this.getFlightViewingId;
    providerValues.registerEdit = this.registerEdit;
    providerValues.getSeatList = this.getSeatList;
    providerValues.getTotalPrice = this.getTotalPrice;
    providerValues.getFlightByFlightName=this.getFlightByFlightName
    providerValues.getPassengerCountByFlightName = this.getPassengerCountByFlightName
    return (
      <FlightDataContext.Provider value={{ ...providerValues }}>
        {this.props.children}
      </FlightDataContext.Provider>
    );
  }
}

export { FlightDataContext, FlightDataProvider };
