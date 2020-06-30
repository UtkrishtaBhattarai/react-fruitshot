import React from "react";
import './useradminview.css'
import axios from "axios";
import './useradminview.js'
import './css-3/animate.css'
import { Link, Redirect } from 'react-router-dom';
import './css-3/bootstrap.min.css'
import './css-3/font-awesome.min.css'
import './css-3/main.css'
import './css-3/perfect-scrollbar.css'
import './css-3/select2.css'
import './css-3/util.css'
import AdminHeaderComponent from "../adminheader/AdminHeaderComponent";

class UserViewAdminComponent extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get("http://localhost:4000/register/getusers").then(response => {
      console.log(response.data);
      this.setState({
        users: response.data
      });
    });
  }



  deleteuser = userid => {
    var x = confirm("Are you sure you want to delete?"); //eslint-disable-line
    if (x) {
      axios.delete("http://localhost:4000/register/deleteuser/" + userid);
      location.reload(); //eslint-disable-line
    } else {
      return false;
    }
  };
  render() {
    if (localStorage.getItem("token") != "tokenhoma") {
      return <Redirect to="/adminlogin" />;
    }
    const mydata = this.state.users.map(users => {
      return (
        
        <tr>
          <th scope="row">{users.email}</th>
          <td>{users.fname}</td>
          <td>{users.lname}</td>
          <td>{users.address}</td>
          <td>{users.number}</td>
          <a>
            {"  "}
            <button
              className="btn btn-primary"
              onClick={() => this.deleteuser(users._id)}
            >
              Delete
            </button>
          </a>
        </tr>
      );
    });
    return (
      
      <div className="container-fluid">
        <AdminHeaderComponent/>
        <div className="row">
                <h1 className="text-center">All Users</h1>
                <table id="myTable" class="table table-dark">
                  <thead>
                    <tr class="header">
                      <th scope="column1">email</th>
                      <th scope="column2">FirstName</th>
                      <th scope="column3">LastName</th>
                      <th scope="column4">Address</th>
                      <th scope="column5">Number</th>
                      <th scope="column6">Delete</th>
                    </tr>
                  </thead>
                  <tbody>{mydata}</tbody>
                </table>
            </div>
          </div>
    );
  }
}

export default UserViewAdminComponent;