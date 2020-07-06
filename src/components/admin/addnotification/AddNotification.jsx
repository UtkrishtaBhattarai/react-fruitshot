import React from "react";
import axios from "axios";

import SimpleReactValidator from "simple-react-validator";
import AdminHeaderComponent from "../adminheader/AdminHeaderComponent";
import { Link, Redirect } from 'react-router-dom';

class AddNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      postedDate: "",
      endDate: "",
      notofication: [],
    };
    this.validator = new SimpleReactValidator();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/notification/notifications")
      .then((response) => {
        console.log(response.data);

        this.setState({
          notofication: response.data,
        });
      });
  }
  pastnotification = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      axios
        .post(
          "http://localhost:4000/notification/upload_notification",
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
          alert("Added Notification");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  deletenotification = (notificationid) => {
    var x = confirm("Are you sure you want to delete?"); //eslint-disable-line
    if (x) {
      axios.delete(
        "http://localhost:4000/notification/deletenotification/" +
          notificationid
      );
      location.reload(); //eslint-disable-line
    } else {
      return false;
    }
  };
  render() {
    const mydata = this.state.notofication.map((notification) => {
      return (
        <tr>
          <th scope="row">{notification.title}</th>
          <td>{notification.description}</td>
          <td>{notification.postedDate}</td>
          <td>{notification.endDate}</td>
          <a>
            {" "}
            <button
              className="btn btn-primary"
              onClick={() => this.deletenotification(notification._id)}
            >
              Delete
            </button>
          </a>
        </tr>
      );
    });

    return (
      <div class="container-fluid">
        <AdminHeaderComponent />
        <div class="row">
          <div className="col-sm-2"></div>
          <div class=" col-sm-8">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h2 class="card-title text-center">Add Notification</h2>
                <form name="myForm">
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Title",
                      this.state.title,
                      "required"
                    )}
                    <label for="inputEmail">Title</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="date"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="postedDate"
                      value={this.state.postedDate}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Posted Date",
                      this.state.postedDate,
                      "required"
                    )}
                    <label for="inputEmail">postedDate</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="date"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="endDate"
                      required
                      value={this.state.endDate}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "End Date",
                      this.state.endDate,
                      "required"
                    )}
                    <label for="inputEmail">endDate</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Description",
                      this.state.description,
                      "required"
                    )}
                    <label for="inputEmail">Description</label>
                  </div>
                  <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.pastnotification}
                  >
                    Add Notification
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">postedDate</th>
                <th scope="col">endDate</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>{mydata}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AddNotification;
