import React, { Component } from "react";
import { Link, Redirect, NavLink } from "react-router-dom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import DarkModeToggle from "../darkmode/DarkModeToggle"

import {
	Navbar,
	NavDropdown,
	Nav,
	Form,
	Button,
	FormControl,
} from "react-bootstrap";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from "./fruitshot.png";

import { FaCartPlus } from "react-icons/fa";

class NavBarComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			register: null,
			userid: localStorage.getItem("userid"),
			config: {
			  headers: { Authorization: "Bearer " + localStorage.getItem("token") }
			}
			
		  };
	  }

	  componentDidMount=e=>
	  {
		if(localStorage.getItem("token")==null)
		{
			document.getElementById("div1").style.display = "block";
		  document.getElementById("div2").style.display = "block";
		  document.getElementById("usernav").style.display = "none";
		  document.getElementById("usernav1").style.display = "none";
		  document.getElementById("usernav2").style.display = "none";
		}
		else{
			document.getElementById("div1").style.display = "none";
		  document.getElementById("div2").style.display = "none";
			document.getElementById("usernav").style.display = "block";
			document.getElementById("usernav1").style.display = "block";
			document.getElementById("usernav2").style.display = "block";
		}
	  }

	  handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem("token");
		localStorage.removeItem("userid");
		localStorage.removeItem("email")
		window.location.href = '/login';
	  };

	
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
						
							<Nav.Link style={{ color: "#fff" }} href="/cart" id="usernav2"  >
								<img src="https://image.flaticon.com/icons/png/512/275/275804.png" style={{width:"30px", height:"30px"}}></img>Cart
							</Nav.Link>


							<UncontrolledDropdown style={{color:"white"}} setActiveFromChild>
          <DropdownToggle tag="a" className="nav-link" caret  id="usernav1">
     <img src="https://www.cubecart.com/img/sellers/173/239/master.PNG" style={{width:"30px",height:"20px"}}/> Order
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag="a" href="/myorders"> <img src="https://www.curiousfinds.com/assets/images/purchase.png" style={{width:"30px", height:"30px"}}></img>Order History</DropdownItem>
			<DropdownItem tag="a" href="/checkorder"> <img src="https://cdn0.iconfinder.com/data/icons/cosmetic-store/25/Order_Status-512.png" style={{width:"30px", height:"30px"}}></img>Order Status</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

		<Nav.Link style={{ color: "#fff" }} href="/users/viewnotification">
							<img src="https://blog.taskpigeon.co/wp-content/uploads/2017/06/Advanced-Email-Notifications-Task-Pigeon.jpg" style={{width:"20px", height:"20px"}}></img>
							Noification
							</Nav.Link>
								
						
						</Nav>
						<Nav>

						<UncontrolledDropdown style={{color:"white"}} setActiveFromChild>
          <DropdownToggle tag="a" style={{marginRight:"100px"}} className="nav-link" caret  id="usernav">
		  <img src="https://www.shareicon.net/data/2016/09/01/822727_user_512x512.png" style={{width:"30px", height:"30px"}}></img>
          </DropdownToggle>
          <DropdownMenu>
         

		<DropdownItem  tag="a" ></DropdownItem>
			<DropdownItem  tag="a" onClick={this.handleLogout}> <img src="https://th.bing.com/th/id/OIP.eWqY1hPQidmsZjo0XP8tpwHaHa?pid=Api&rs=1" style={{width:"30px", height:"30px"}}></img>Logout</DropdownItem>
			<DropdownItem tag="a" href="/profile"><img src="https://cdn3.iconfinder.com/data/icons/rcons-e-mail-client/32/search_contact_mail-512.png" style={{width:"30px", height:"30px"}}></img>View Profile</DropdownItem>
			<DropdownItem tag="a" href="/deleteprofile"> <img src="https://th.bing.com/th/id/OIP.g8beJe2R0TpPCftfEcqIUwHaF8?pid=Api&rs=1" style={{width:"30px", height:"30px"}}></img>Delete Profile</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

							<Nav.Link style={{ color: "#fff" }} href="/login" id="div2">
							<img src="https://th.bing.com/th/id/OIP.4GUgfdIa-ZTmhyayR7g35wHaHa?pid=Api&rs=1" style={{width:"20px", height:"20px"}}></img>
							Login
							</Nav.Link>

							<Nav.Link style={{ color: "#fff" }} href="/register" id="div1">
							<img src="https://th.bing.com/th/id/OIP.sYKmO23D9gxcd-2ThzxTZAHaIe?pid=Api&rs=1" style={{width:"20px", height:"20px"}}></img>
							Register
							</Nav.Link>


							<DarkModeToggle/>
						

                        </Nav>
						
					</Navbar.Collapse>
				</Navbar>
				<Switch></Switch>
			</div>
		);
	}
}

export default NavBarComponent;
