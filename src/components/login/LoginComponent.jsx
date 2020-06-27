import React, { Component } from "react";
import "./login.css";
import login from "../login/login.jpg";
import axios from "axios";
import { Link, Redirect, Switch, Route } from "react-router-dom";
import DashboardComponent from "../dashboard/DashboardComponent";
import UserHeaderComponent from "../header/HeaderComponent";
//import UserOrderComponent from "../userorder/UserOrderComponent";
import SimpleReactValidator from "simple-react-validator";
class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      nameError: "",
      passworderror: ""
    };
    this.validator = new SimpleReactValidator();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    if (this.validator.allValid()) {
      e.preventDefault();
      axios
        .post("http://localhost:4000/register/login_user", this.state)
        .then(response => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          console.log(response.data.token);
          this.setState({
            email: "",
            password: "",
            isLoggedIn: true
          });
          alert("Logged In");
        })

        .catch(err => console.log(err));
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    if (this.state.isLoggedIn === true) {
      return <Redirect to="/dashboard" />
      
    } else if (localStorage.getItem("userid") != null) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div class="container" backround-image={login}>
        <div class="row">
          <div className="col-sm-2"></div>
          <div class=" col-sm-8">
            <div class="card card-signin my-5">
              <div class="card-body">
                <form>
                  <h2 class="card-title text-center">Login</h2>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="email"
                      autofocus
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Email",
                      this.state.email,
                      "required|email"
                    )}
                    <label for="inputEmail">Email address</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      name="password"
                      required
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Password",
                      this.state.password,
                      "required"
                    )}
                    <label for="inputPassword">Password</label>
                  </div>
                  <button
                    class="btn btn-lg btn-success btn-block text-uppercase"
                    type="submit"
                    onClick={this.handleClick}
                  >
                    Sign in
                  </button>
                  <h5 class="text-center">
                    
                    <a href="/register" to color="blue">
                      Register
                    </a>
                    <a>   here!!</a>
                  </h5>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Switch>
          {/* <Route path="/userheader" component={UserOrderComponent} /> */}
        </Switch>
      </div>
    );
  }
}
export default LoginComponent;