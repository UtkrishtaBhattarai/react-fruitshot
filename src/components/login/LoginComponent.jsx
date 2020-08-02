import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './login.css'
import SimpleReactValidator from "simple-react-validator";
import AdBlockDetect from 'react-ad-block-detect';
import Swal from 'sweetalert2';
import {
    Container, Col, Form, FormGroup, Label, Input, Button, FormText
} from 'reactstrap'
import axios from 'axios'
import NavBarComponent from '../usernavigation/NavbarComponent';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          isLoggedIn: false,
          nameError: "",
          passworderror: "",
        };
        this.validator = new SimpleReactValidator();
      }
    
      handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
      handleClick = e => {
        if (this.validator.allValid()) 
        {
          e.preventDefault();
          axios
            .post("http://localhost:4000/register/login_user", this.state)
            .then(response => {
              console.log(response);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("email",response.data.email)
              console.log(response.data.token);
              console.log(response.data.name)
              this.setState({
                email: "",
                password: "",
                isLoggedIn: true,
                isinvalid:false
              });
              Swal.fire({
                title: 'This Site uses cookies for enhancing your experience',
                text: 'Are you okay with this ?',
                icon: 'success',
                confirmButtonText: 'Okay',
                cancelButtonText:'Cancel'
              })
            })
            .catch(err => console.log(err))
        }
         else 
         {
          this.validator.showMessages();
          this.forceUpdate();
        }
      };
    render() {
        if (this.state.isLoggedIn === true) {
            return <Redirect to='/' />
        }
        if (localStorage.getItem("userid") != null) {
          return <Redirect to="/" />;
        }
        return (
            <html lang="en" >
<body>
  <div>
    <div className="container-fluid">
      <NavBarComponent></NavBarComponent>
      </div>
<div class="container">
  <div class="left-section">
    <div class="header">
      <h1 class="animation a1">Welcome User!</h1>
      <h4 class="animation a2">Log in for entering your membership dashboard.</h4>
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
      <p class="animation a5"><Link to='/adminlogin'> Admin?</Link></p>
      <p className="text-center"><Link to='/register'> Register Here!</Link></p>
      <p className="text-center" style={{color:"Red"}}><Link to='/forgotpassword'> Forgot Password!</Link></p>
      <button name="login" onClick={this.handleClick} class="animation a6">LOGIN</button>
    </div>
  </div>
  <div class="right-section"></div>
</div>
</div>
  
</body>
</html>
        )
    }
}

export default LoginComponent;