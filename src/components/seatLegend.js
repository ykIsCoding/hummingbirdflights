import {Badge} from "shards-react"
import { FlightDataContext } from "../contexts/flightDataContext"
const SeatLegend = ()=>{
    return(
        <FlightDataContext.Consumer>
            {({seatslegendlist})=>
        <div class="d-flex flex-column justify-content-start align-items-start">
            {seatslegendlist.map(s=>
            <div class="m-1 d-flex flex-row justify-content-between">
                <Badge style={{backgroundColor:s.color,marginRight:"5%"}}>  </Badge>
                <text>{s.name[0].toUpperCase()+s.name.slice(1)}</text>
            </div>
                )}
        </div>
}
        </FlightDataContext.Consumer>
    )
}

export default SeatLegend