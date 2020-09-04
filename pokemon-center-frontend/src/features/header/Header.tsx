import "./Header.scss";
import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import Pokeball from "../../assets/images/pokeball.png";

export class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src={Pokeball} alt="pokeball" className="pokeball-logo" />
            <span>Pokemon Center</span>
          </NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/pokedex" className="text-muted">
                Pokedex
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
