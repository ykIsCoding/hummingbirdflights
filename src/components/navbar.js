import { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
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

export default class AllPageNavbar extends Component {
  render() {
    return (
      <Navbar sticky type="light" expand="lg">
        <NavbarBrand href="http://localhost:3000/">
          Hummingbird Air Transit
        </NavbarBrand>
        <Nav navbar>
          <NavItem style={{ marginLeft: "2vw", marginRight: "2vw" }}>
            <NavLink style={{ textDecoration: "none" }} to="/aboutus">
              About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{ textDecoration: "none" }} to="/bookflights">
              Book Flights
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
