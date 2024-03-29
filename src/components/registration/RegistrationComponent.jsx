import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Route, NavLink, Switch } from "react-router-dom";
import "./register.css";
import Swal from "sweetalert2";
// import DashboardComponent from "../dashboard/DashboardComponent";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import NavBarComponent from "../usernavigation/NavbarComponent";
class RegisterComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fname: "",
			lname: "",
			address: "",
			email: "",
			phone: "",
			password: "",
			isRegistered: false,
		};
		this.validator = new SimpleReactValidator();
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	register = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:4000/register/checkuser/", this.state)
			.then((value) => {
				const khai = value.data.status;
				if (khai == "nouser") {
					if (this.validator.allValid()) {
						axios
							.post("http://localhost:4000/register/register", this.state)
							.then((response) => {
								this.setState({
									fname: "",
									lname: "",
									address: "",
									email: "",
									phone: "",
									password: "",
									isRegistered: true,
								});
								Swal.fire({
									title: "Success!",
									text: "You Have Been Registered",
									icon: "success",
									confirmButtonText: "Cool",
								});
							})
							.catch((err) => console.log(err));
					} else {
						this.validator.showMessages();
						this.forceUpdate();
					}
					return;
				} else if (khai == "alreadyuser") {
					Swal.fire({
						title: "Cant Register!",
						text: "Email ID already exists",
						icon: "error",
						confirmButtonText: "Cool",
					});

				}
			});
		
	};
	render() {
		if (this.state.isRegistered === true) {
			return <Redirect to="/login" />;
		}
		if (localStorage.getItem("userid") != null) {
			return <Redirect to="/" />;
		}
		return (
			<body>
				<div>
					<div className="container-fluid">
						<NavBarComponent></NavBarComponent>
					</div>
					<div class="container">
						<div class="left-section">
							<div class="header">
								<h1 class="animation a1">Register!</h1>
							</div>
							<div class="form">
								<input
									type="text"
									class="form-field animation a3"
									value={this.state.fname}
									name="fname"
									onChange={this.handleChange}
									placeholder="First Name"
								/>
								{this.validator.message(
									"First Name",
									this.state.fname,
									"required"
								)}
								<input
									type="text"
									class="form-field animation a3"
									name="lname"
									value={this.state.lname}
									onChange={this.handleChange}
									placeholder="Last Name"
								/>
								{this.validator.message(
									"Last Name",
									this.state.lname,
									"required"
								)}

								<input
									type="text"
									class="form-field animation a3"
									value={this.state.address}
									name="address"
									onChange={this.handleChange}
									placeholder="Address"
								/>
								{this.validator.message(
									"Address",
									this.state.address,
									"required"
								)}

								<input
									type="text"
									class="form-field animation a3"
									value={this.state.email}
									name="email"
									onChange={this.handleChange}
									placeholder="ram@gmail.com"
								/>
								{this.validator.message(
									"Email",
									this.state.email,
									"required|email"
								)}

								<input
									type="text"
									class="form-field animation a3"
									value={this.state.phone}
									name="phone"
									onChange={this.handleChange}
									placeholder="Number"
								/>
								{this.validator.message(
									"Phone Number",
									this.state.phone,
									"required|phone"
								)}

								<input
									type="password"
									class="form-field animation a4"
									value={this.state.password}
									name="password"
									onChange={this.handleChange}
									placeholder="Password"
								/>
								{this.validator.message(
									"Password",
									this.state.password,
									"required"
								)}

								<button onClick={this.register} class="animation a6">
									REGISTER
								</button>
							</div>
							<p className="text-center">
								<Link to="/"> Login Here!</Link>
							</p>
						</div>
						<div class="right-section"></div>
					</div>
				</div>
			</body>
		);
	}
}

export default RegisterComponent;
