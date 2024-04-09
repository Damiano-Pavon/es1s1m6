import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const MyNav = () => {
  return (
    <Navbar className="mb-5" bg="dark" variant="dark" expand="lg">
        <div className="d-flex container">
      <Navbar.Brand >STRIVEBLOG</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/">Login</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNav;