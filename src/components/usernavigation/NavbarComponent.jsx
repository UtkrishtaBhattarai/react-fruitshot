import React, { Component } from "react";

import { Route, NavLink, Switch, BrowserRouter } from "react-router-dom";

import {
	Navbar,
	NavDropdown,
	Nav,
	Form,
	Button,
	FormControl,
} from "react-bootstrap";
import logo from "./fruitshot.png";

import { FaCartPlus } from "react-icons/fa";

class NavBarComponent extends Component {
	state = {};

	render() {
		const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
		return (
			<div>
				<Navbar className="navbar sticky-top" bg="light" expand="lg">
					<Navbar.Brand href="/">
						<img
							src={logo}
							width="50"
							height="50"
							className="d-inline-block align-top"
							alt="React Bootstrap logo"
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse
						id="basic-navbar-nav"
						style={{ backgroundColor: "#613f99" }}
					>
						<Nav className="mr-auto">
							<Nav.Link style={{ color: "#fff" }} href="/">
								Home
							</Nav.Link>

							<Nav.Link style={{ color: "#fff" }} href="/login">
								Login
							</Nav.Link>
							<Nav.Link style={{ color: "#fff" }} href="/profile">
								Profile
							</Nav.Link>
						</Nav>
						<Nav>
                        <NavDropdown title="Profile" id="nav-dropdown">
							<NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
							<NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
							<NavDropdown.Item eventKey="4.3">
								Something else here
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
						</NavDropdown>
                        </Nav>
					</Navbar.Collapse>
				</Navbar>
				<Switch></Switch>
			</div>
		);
	}
}

export default NavBarComponent;
