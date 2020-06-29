import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Route, NavLink, Switch } from "react-router-dom";
import './register.scss'
// import DashboardComponent from "../dashboard/DashboardComponent";
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
        .post("http://localhost:4000/register/register_user", this.state)
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
    // if (this.state.isRegistered === true) {
    //   return <Redirect to="/dashboard" />;
    // }
    // if (localStorage.getItem("userid") != null) {
    //   return <Redirect to="/dashboard" />;
    // }
    return (
        <body>
 
        <div class="container">
          <div class="left-section">
            <div class="header">
              <h1 class="animation a1">Register!</h1>
            </div>
            <div class="form">
              <input type="text" class="form-field animation a3" value={this.state.fname} name="fname"
                              onChange={this.handleChange} placeholder="First Name"/>
                               {this.validator.message(
                              "First Name",
                              this.state.fname,
                              "required"
                            )}
                 <input type="text" class="form-field animation a3" name="lname" value={this.state.lname}
                              onChange={this.handleChange} placeholder="Last Name"/>
                               {this.validator.message(
                              "Last Name",
                              this.state.lname,
                              "required"
                            )}

<input type="text" class="form-field animation a3" value={this.state.address} name="address"
                              onChange={this.handleChange} placeholder="Address"/>
                               {this.validator.message(
                              "Address",
                              this.state.address,
                              "required"
                            )}


<input type="text" class="form-field animation a3" value={this.state.email} name="email"
                              onChange={this.handleChange} placeholder="ram@gmail.com"/>
                               {this.validator.message(
                              "Email",
                              this.state.email,
                              "required|email"
                            )}


<input type="text" class="form-field animation a3" value={this.state.number} name="number"
                              onChange={this.handleChange} placeholder="Number"/>
                               {this.validator.message(
                              "Phone Number",
                              this.state.number,
                              "required|phone"
                            )}


              <input type="password" class="form-field animation a4" value={this.state.password} name="password"
                              onChange={this.handleChange} placeholder="Password"/>
                               {this.validator.message(
                              "Password",
                              this.state.password,
                              "required"
                            )}
              <button onClick={this.register} class="animation a6">LOGIN</button>
            </div>
          </div>
          <div class="right-section"></div>
        </div>
          
        </body>
    );
  }
}

export default RegisterComponent;