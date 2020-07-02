import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './adminlogin.scss'
import SimpleReactValidator from "simple-react-validator";
import {
    Container, Col, Form, FormGroup, Label, Input, Button, FormText
} from 'reactstrap'
import axios from 'axios'

class AdminLoginComponent extends Component {
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
            .post("http://localhost:4000/register/login_admin", this.state)
            .then(response => {
              console.log(response);
              localStorage.setItem("a_token", "tokenhoma");
    
              console.log(response.data.token);
              this.setState({
                email: "",
                password: "",
                isLoggedIn: true
              });
            })
            .catch(err => console.log(err));
        } else {
          this.validator.showMessages();
          this.forceUpdate();
        }
      };
    render() {
        if (this.state.isLoggedIn === true) {
            return <Redirect to='admin/viewusers' />
        }
        return (
            <html lang="en" >
<body>
 
<div class="container">
  <div class="left-section">
    <div class="header">
      <h1 class="animation a1">Welcome Admin!</h1>
    </div>
    <div class="form">
      <input type="email" class="form-field animation a3" value={this.state.email} name="email"
                      onChange={this.handleChange} placeholder="Username"/>
                       {this.validator.message(
                      "Email",
                      this.state.email,
                      "required|email"
                    )}
      <input type="password" class="form-field animation a4" value={this.state.password} name="password"
                      onChange={this.handleChange} placeholder="Password"/>
                       {this.validator.message(
                      "Password",
                      this.state.password,
                      "required"
                    )}
      <p class="animation a5"><Link to='/'> User?!</Link></p>
      <button onClick={this.handleClick} class="animation a6">LOGIN</button>
    </div>
  </div>
  <div class="right-section"></div>
</div>
  
</body>
</html>
        )
    }
}

export default AdminLoginComponent;