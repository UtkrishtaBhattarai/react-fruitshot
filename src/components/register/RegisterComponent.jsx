import React from "react";
import "./register.css";
import { Link, Redirect } from "react-router-dom";
import { Route, NavLink, Switch } from "react-router-dom";
//import DashboardComponent from "../dashboard/DashboardComponent";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      address: "",
      email: "",
      number: "",
      password: "",
      isRegistered: false
    };
    this.validator = new SimpleReactValidator();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  register = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      axios
        .post("http://localhost:4000/register/register", this.state)
        .then(response => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          console.log(response.data.token);
          this.setState({
            fname: "",
            lname: "",
            address: "",
            email: "",
            number: "",
            password: "",
            isRegistered: true
          });
          alert("Registered");
        })
        .catch(err => console.log(err));
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    if (this.state.isRegistered === true) {
      return <Redirect to="/dashboard" />;
    }
    if (localStorage.getItem("userid") != null) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div class="container">
        <div class="row">
          <div className="col-sm-1"></div>
          <div class=" col-sm-11">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h2 class="card-title text-center">Register</h2>
                <form>
                  <div class="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail"
                      required
                      name="fname"
                      autofocus
                      value={this.state.fname}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Fname",
                      this.state.fname,
                      "required"
                    )}
                    <label for="inputEmail">First Name</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="lname"
                      autofocus
                      value={this.state.lname}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Lname",
                      this.state.lname,
                      "required"
                    )}
                    <label for="inputEmail">Last Name</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="email"
                      autofocus
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "email",
                      this.state.email,
                      "required|email"
                    )}
                    <label for="inputEmail">Email address</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="password"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="password"
                      autofocus
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Title",
                      this.state.password,
                      "required"
                    )}
                    <label for="inputEmail">Password</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="address"
                      autofocus
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Address",
                      this.state.address,
                      "required"
                    )}
                    <label for="inputEmail">Address</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="number"
                      id="inputPassword"
                      class="form-control"
                      name="number"
                      required
                      value={this.state.number}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Number",
                      this.state.number,
                      "required|phone"
                    )}
                    <label for="inputPassword">Number</label>
                  </div>
                  <button
                    class="btn btn-lg btn-success btn-block text-uppercase"
                    type="submit"
                    onClick={this.register}
                  >
                    Sign Up
                  </button>
                  <h5 class="text-center">
                    Already a user?
                    <a href="login" color="blue">
                      Login
                    </a>
                  </h5>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;