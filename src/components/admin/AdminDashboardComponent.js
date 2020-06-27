import React from "react";
import axios from "axios";
class AdminDashboardComponent extends React.Component {
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
    const mydata = this.state.users.map(users => {
      return (
        <tr>
          <th scope="row">{users.email}</th>
          <td>{users.fname}</td>
          <td>{users.lname}</td>
          <td>{users.address}</td>
          <td>{users.number}</td>
          <a>
            {" "}
            <button
              className="btn btn-primary"
              // onClick={() => this.deleteuser(users._id)}
            >
              Delete
            </button>
          </a>
        </tr>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div class="table-responsive">
              <table class="table" id="table">
                <h1 className="text-center">All Users</h1>
                <table class="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">email</th>
                      <th scope="col">FirstName</th>
                      <th scope="col">LastName</th>
                      <th scope="col">Address</th>
                      <th scope="col">Number</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>{mydata}</tbody>
                </table>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboardComponent;
