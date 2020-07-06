import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Route, NavLink, Switch } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password:  Math.random().toString(36).substring(7)
      
    };
    this.validator = new SimpleReactValidator();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.setState({
			ordernumber:this.state.password
    });
	}

  register = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      axios
        .post("http://localhost:4000/register/forgotpassword", this.state)
        .then(response => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          console.log(response.data.token);
          this.setState({
            email: "",
            ordernumber:Math.random().toString(36).substring(7),
          });
          Swal.fire({
            title: 'Success!',
            text: 'You Have Changed ',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
        })
        .catch(err => console.log(err));
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    return (
        <body>
 <div>
   <div className="container-fluid">
   </div>
        <div class="container">
          <div class="left-section">
            <div class="header">
              <h1 class="animation a1">Forgot Password!</h1>
            </div>
            <div class="form">
<input type="text" class="form-field animation a3" value={this.state.email} name="email"
                              onChange={this.handleChange} placeholder="ram@gmail.com"/>
                               {this.validator.message(
                              "Email",
                              this.state.email,
                              "required|email"
                            )}
                            
              <button onClick={this.register} class="animation a6">Forgot Password</button>
            
            </div>
          </div>
          <div class="right-section"></div>
        </div>
        </div>
          
        </body>
    );
  }
}

export default ForgotPassword;