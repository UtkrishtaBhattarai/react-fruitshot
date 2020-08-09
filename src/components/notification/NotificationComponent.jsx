import React from "react";
import axios from "axios";
import NavBarComponent from "../usernavigation/NavbarComponent";
import DarkModeToggle from "../darkmode/DarkModeToggle";

class NotificationComponent extends React.Component {
  state = {
    notification: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/notification/notifications")
      .then(response => {
        console.log(response.data);
        this.setState({
          notification: response.data
        });
      });
  }
  render() {
    const mydata = this.state.notification.map(notification => {
      return (
        <div className="col-sm-12">
        <div class="card">
          <div class="card-body">
            <a href="#" class="card-link">
              Date Posted: {notification.postedDate}
            </a>
            <br></br>
            <a href="#" class="card-link">
              End Date:{notification.endDate}
            </a>
            <h5 class="card-title">{notification.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Description</h6>
            <p class="card-text">{notification.description}</p>
          </div>
        </div>
        </div>
      );
    });
    return (
      <div className="container-fluid">
        <NavBarComponent/>
        <h1 className="text-center">Notifications</h1>
        {mydata}
      </div>
    );
  }
}

export default NotificationComponent;