import React from "react";
import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

const BootstrapNavbar = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/">Glints restaurants app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/restaurants">Restaurants</Nav.Link>
            <Nav.Link href="/collections">My Collections</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BootstrapNavbar;

