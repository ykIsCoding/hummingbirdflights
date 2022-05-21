import React, { Component } from "react";
import { Card,CardBody,CardTitle,CardHeader,CardFooter,Badge} from "shards-react";
import Button from '../components/button.js'
import {Divider} from "antd"
import {GiAirplaneDeparture} from 'react-icons/gi'
import {RiFlightLandLine} from 'react-icons/ri'
import FlightInfoModal from "./flightInfoModal";

export default class FlightCard extends Component{
    constructor(props){
        super(props)
        this.state={
            openModal:false,
            cardDestinations:[
                {
                    "Airport":"Hermes Quijada International Airport",
                    "Place":"Rio Grande, Argentina"
                        },
                {
                    "Airport":"Port Stanley Airport",
                    "Place":"Falkland Islands"
                        }
                    ]
    }
    this.switchDestinations= this.switchDestinations.bind(this)
    this.handleButtonToggleModal = this.handleButtonToggleModal.bind(this)
}

switchDestinations(){
    this.setState({
        cardDestinations: ([...this.state.cardDestinations]).reverse()
    })
}

handleButtonToggleModal(){
    this.setState({
        openModal:!this.state.openModal
    })
}
    render(){
        return(
            <Card style={{ maxWidth: "300px",borderRadius:0}}>
                                <CardHeader>
                                <CardTitle>Departs From <GiAirplaneDeparture/></CardTitle>
            <h4>{this.state.cardDestinations[0].Airport}</h4>
        <h5>{this.state.cardDestinations[0].Place}</h5>
                                </CardHeader>
                                <CardBody>
        <CardTitle>Arrives At <RiFlightLandLine/></CardTitle>
        <h4>{this.state.cardDestinations[1].Airport}</h4>
        <h5>{this.state.cardDestinations[1].Place}</h5>
      </CardBody>
      <Button style={{marginLeft:10,marginRight:10,marginTop:2.5,marginBottom:2.5}} onClick={this.switchDestinations} outline block>Switch</Button>
      <Button style={{marginLeft:10,marginRight:10,marginTop:2.5,marginBottom:10}} onClick={this.handleButtonToggleModal} block>More Info</Button>
    <FlightInfoModal open={this.state.openModal} toggleModal={this.handleButtonToggleModal} search={this.state.cardDestinations}/>
    </Card>
        );
    }
}