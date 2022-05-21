import { Component,useEffect,useState,useContext } from "react";
import { FlightDataContext } from "../contexts/flightDataContext";
import PageTemplate from "./pageTemplate";
import { useNavigate, useParams } from "react-router-dom";

function TrackedFlightPage() {
  let parameters = useParams();
  const contextValue= useContext(FlightDataContext)
  const [state,setState] = useState({
    flightNumber:parameters.flightNumber,
    status:"No Status",
    start:"No Data",
    end:"No Data",
    endTime:"No Data",
    startTime:"No Data",
    aircraft:"No Data",
    passengers:"No Data"
  })
  
  const {flightNumber, status,start,end,endTime,startTime,aircraft,passengers} = state
  let flightDataObj = contextValue.getFlightByFlightName(parameters.flightNumber)

  useEffect(()=>{
    if(flightDataObj){
    const {Status,DepartureLocation,ArrivalLocation,FlightName,Time,Day,Aircraft} = flightDataObj
    setState({
    flightNumber:parameters.flightNumber,
    status:Status,
    start:DepartureLocation,
    end:ArrivalLocation,
    endTime:"No Data",
    startTime:Time,
    aircraft:Aircraft,
    passengers:contextValue.getPassengerCountByFlightName(parameters.flightNumber)
    })
  }
  },[flightDataObj])
  

  return (
    <PageTemplate>
      <div class="p-5">
        <h4>Flight Information for</h4>
        <h1>{flightNumber}</h1>
      </div>
      <div class="p-5 flex-column">
        <h3>
          <span class="badge badge-info">{status}</span>
        </h3>
        <h4>
          Flight from {start} to {end}
        </h4>
        <h4>Scheduled Departure: {startTime} </h4>
        <h4>Scheduled Arrival: {endTime} </h4>
        <h4>Aircraft: {aircraft} </h4>
        <h4>Passengers: {passengers} </h4>
      </div>
    </PageTemplate>
  );
}

export default TrackedFlightPage;
