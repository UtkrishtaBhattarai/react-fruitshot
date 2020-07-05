import React, { Component } from "react";
import { Button, Form, Col, Card } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import NavBarComponent from "../usernavigation/NavbarComponent";


class DeleteProfileComponent extends Component {
	constructor(props) {
        super(props)
        this.state = {
            register: [],
            userid: localStorage.getItem("userid"),
            config: {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }
            
          };
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

      deleteUser = e => {
        e.preventDefault();
        axios
          .delete(
            "http://localhost:4000/register/deleteme",
            this.state.register,
            this.state.config
          )
          .then(response => console.log(response.data))
          .catch(err => console.log(err.response));
        this.props.history.push("/login");
        localStorage.removeItem("token");
		localStorage.removeItem("userid");
		localStorage.removeItem("name");
		localStorage.removeItem("email")
		window.location.href = '/login';
      };
    

	render() {
		if (localStorage.getItem("userid") == null) {
			return <Redirect to="/login" />;
    }

		return (
			<div className="container-fluid">
<NavBarComponent/>

<input type="submit" onClick={this.deleteUser} value ="Permanently Delete Account"/>
            </div>
						
		);
	}
}

export default DeleteProfileComponent;