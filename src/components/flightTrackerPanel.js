import { Component } from "react";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput,
    Collapse,
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
  } from "shards-react";
import Button from './button'
import { useNavigate,useParams,Link,Navigate } from "react-router-dom";

function TrackedFlight(inputNumber){
    let nav = useNavigate()
    nav(`/flighttracker/${inputNumber}`)
}

export default class FlightTrackerPanel extends Component{
    constructor(props){
        super(props)
        this.state={
            flightNumber: '',
            navigate:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(v){
        this.setState({
            flightNumber:v.target.value
        })
    }

    handleClick(){
        this.setState({
            navigate:true
        })
    }



    render(){
        return(
            <>
                <FormInput onChange={this.handleChange} style={{borderRadius:0}} size="md" placeholder="Large input" />
                {this.state.navigate && 
                <Navigate to={`/flighttracker/${this.state.flightNumber}`}>
                </Navigate>
                }
                    <Button onClick={this.handleClick} disabled={(this.state.flightNumber.trim()).length===0}>
                    Search
                    </Button>
                
            </>
        )
    }
}