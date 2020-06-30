import React from "react";
import axios from "axios";
import { Link, Redirect, NavLink } from "react-router-dom";
import HeaderComponent from "../usernavigation/HeaderComponent";
import SimpleReactValidator from "simple-react-validator";
import './profile.scss'

class ProfileComponent extends React.Component {
 
  constructor(props) {
    super(props)
    this.state = {
        register: null,
        userid: localStorage.getItem("userid"),
        config: {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
        
      };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/register/me", this.state.config)
      .then(response => {
        console.log(response.data);
        localStorage.setItem("userid", response.data._id);
        this.setState({
          register: response.data
        });
      });
  }

  handleChange = e => {
    this.setState({
      register: this.state.register,
      [e.target.name]: e.target.value
    });
  };

  handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    this.props.history.push("/login");
  };
  updateUser = e => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:4000/register/me",
        this.state.register,
        this.state.config
      )
      .then(response => console.log(response.data))
      .catch(err => console.log(err.response));
    this.props.history.push("/dashboard");
  };

  render() {
    if (this.state.user === null) {
        return <h3>Loading ...</h3>
    }
    if (localStorage.getItem("userid") == null) {
      return <Redirect to="/login" />;
    }
    return (
      <div class="container-fluid">
          <HeaderComponent/>
          <div class="left-section">
            <div class="header">
              <h1 class="animation a1">Your Details Here!</h1>
            </div>
            <div class="form">
              <input type="text" class="form-field animation a3"  name="fname"
                      autofocus
                       value={this.state.register.fname}
                      onChange={this.handleChange}/>
                               {this.validator.message(
                              "First Name",
                              this.state.fname,
                              "required"
                            )}
                 <input type="text" class="form-field animation a3" name="lname" 
                      autofocus
                      value={this.state.register.lname}
                      onChange={this.handleChange}/>
                               {this.validator.message(
                              "Last Name",
                              this.state.lname,
                              "required"
                            )}

<input type="text" class="form-field animation a3"  name="address"
                      autofocus
                      value={this.state.register.address}
                      onChange={this.handleChange}/>
                               {this.validator.message(
                              "Address",
                              this.state.address,
                              "required"
                            )}


<input type="text" class="form-field animation a3" value={this.state.email}name="email"
                      autofocus
                      value={this.state.register.email}
                      onChange={this.handleChange}/>
                               {this.validator.message(
                              "Email",
                              this.state.email,
                              "required|email"
                            )}


<input type="text" class="form-field animation a3" value={this.state.phone} name="phone"
                              onChange={this.handleChange} placeholder="Number"/>
                               {this.validator.message(
                              "Phone Number",
                              this.state.phone,
                              "required|phone"
                            )}                  <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.updateUser}
                  >
                    Update
                  </button>
                  <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </button>
              </div>
            </div>
          </div>
    );
  }
}

export default ProfileComponent;