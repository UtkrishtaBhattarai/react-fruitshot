import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import "./complaint.css"
import axios from "axios";
import Swal from "sweetalert2";

import SimpleReactValidator from "simple-react-validator";
class ComplaintComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: localStorage.getItem("email"),
      passworderror: "",
      email:"",
      complaint:"",
    };
    this.validator = new SimpleReactValidator();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  postcomplaint = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      axios
        .post(
          "http://localhost:4000/complaint/upload_complain",
          this.state
        )
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          console.log(response.data.token);
          this.setState({
            title: "",
            description: "",
            postedDate: "",
            endDate: "",
          });
          Swal.fire({
						title: "Success!",
						text: "You Have Submitted your query",
						icon: "success",
						confirmButtonText: "Cool",
					});
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  openform = e => {
    e.preventDefault()
    document.getElementById("myForm").style.display = "block";
  }
  
   closeForm=e => {
    e.preventDefault()
    document.getElementById("myForm").style.display = "none";
  }
	render() {
		return (
      <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>
      <body>
      
      <button class="open-button" onClick={this.openform}>Admin Support</button>
      
      <div class="form-popup" id="myForm">
        <form class="form-container">
          <h1>Complaint/Query</h1>
      
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" onChange={this.handleChange}  value={this.state.email} name="email" required/>
          {this.validator.message(
                      "Email",
                      this.state.email,
                      "required"
                    )}
      
          <label for="psw"><b>Complaint</b></label>
          <textarea  placeholder="Enter Complaint" onChange={this.handleChange}  value={this.state.complaint} style={{width:"280px", marginBottom:"10px", height:"100px"}}  name="complaint" required/>
          {this.validator.message(
                      "Complaint",
                      this.state.complaint,
                      "required"
                    )}
      
          <button type="submit"  onClick={this.postcomplaint}  class="btn">Submit</button>
          <button type="button" class="btn cancel" onClick={this.closeForm}>Close</button>
        </form>
      </div>

      
      </body>
      </html>
		);
	}
}
export default ComplaintComponent;
