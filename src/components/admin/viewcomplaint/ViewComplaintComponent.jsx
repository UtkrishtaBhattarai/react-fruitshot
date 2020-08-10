import React from "react";
import axios from "axios";
import AdminHeaderComponent from "../adminheader/AdminHeaderComponent";
import { Link, Redirect } from "react-router-dom";
class ViewComplaintComponent extends React.Component {
  state = {
    order: [],
    dispatched: "yes",
  };

  componentDidMount() {
    axios.get("http://localhost:4000/complaint/complaints").then((response) => {
      console.log(response.data);
      this.setState({
        order: response.data,
      });
    });
  }

  render() {
    if (localStorage.getItem("a_token") != "tokenhoma") {
      return <Redirect to="/adminlogin" />;
    }
    const mydata = this.state.order.map((order) => {
      return (
        <tr>
          <th scope="row">{order.email}</th>
          <td>{order.complaint}</td>
        </tr>
      );
    });
  

    
  }
}

export default ViewComplaintComponent;
