import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


function Navigation() {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="/">T-Planner</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">Trips </Link>
          <Link className="nav-link" to="/trip/add">Add Trip</Link>
          <Link className="nav-link" to="/activities">Activities</Link>
          <Link className="nav-link" to="/activity/add">Add Activity</Link>
          <Link className="nav-link" to="/packingLists">Packing List</Link>
          <Link className="nav-link" to="/packingList/add">Add Packing List</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
