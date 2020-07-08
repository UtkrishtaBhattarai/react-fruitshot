import React from "react";
import axios from "axios";
import { Link, Redirect, NavLink } from "react-router-dom";
import HeaderComponent from "../usernavigation/HeaderComponent";
import SimpleReactValidator from "simple-react-validator";
import './profile.scss'
import NavBarComponent from "../usernavigation/NavbarComponent";

class ProfileComponent extends React.Component {
 
  constructor(props) {
    super(props)
    this.state = {
        register: [],
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

  updateUser = e => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:4000/register/me",
        this.state,
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
         <NavBarComponent/>
        <div className="row">
        <div className="col-sm-4">
          <div class="left-section">
            <div class="header">
              <h1 class="animation a1">Your Details Here!</h1>
            </div>
            <div class="form">
              <input type="text" class="form-field animation a3"  name="fname"
                      autofocus
                      placeholder={this.state.register.fname}
                       value={this.state.fname}
                      onChange={this.handleChange}/>
                               {this.validator.message(
                              "First Name",
                              this.state.fname,
                              "required"
                            )}
                 <input type="text" class="form-field animation a3" name="lname" 
                      autofocus
                      placeholder={this.state.register.lname}
                      value={this.state.lname}
                      onChange={this.handleChange}/>
                               {this.validator.message(
                              "Last Name",
                              this.state.lname,
                              "required"
                            )}

<input type="text" class="form-field animation a3"  name="address"
                      autofocus
                      placeholder={this.state.register.address}
                      value={this.state.address}
                      onChange={this.handleChange}/>
                               {this.validator.message(
                              "Address",
                              this.state.address,
                              "required"
                            )}
                 <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.updateUser}
                  >
                    Update
                  </button>
              </div>
            </div>
            </div>
            <div className="col-sm-8">
             <img style={{width:"100%",height:"540px"}} src="https://static-communitytable.parade.com/wp-content/uploads/2014/07/seasonal-produce-ftr.jpg"/>
            </div>
            </div>
          </div>
    );
  }
}

export default ProfileComponent;