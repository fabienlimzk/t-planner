import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="/">T-Planner</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/activities">Activities</Nav.Link>
          <Nav.Link href="/activity/add">Add Activity</Nav.Link>

<<<<<<< HEAD
          <Nav.Link href="/packingLists">Packing List</Nav.Link>
          <Nav.Link href="/packingList/add">Add Packing List</Nav.Link>
          <Nav.Link href="/trip/add">Add Trip</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
=======
                    <Nav.Link href="/packingLists">Packing List</Nav.Link>
                    <Nav.Link href="/packingList/add">Add Packing List</Nav.Link>
                    <Nav.Link href="/trip/add">Add Trip</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
>>>>>>> 230be8fb23dd5ce077954a8408c74195937389ed
}

export default Navigation;
