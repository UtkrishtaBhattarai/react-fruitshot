import React from "react";
import axios from "axios";
import AdminHeaderComponent from "../adminheader/AdminHeaderComponent";
class OrderComponent extends React.Component {
  state = {
    order: [],
    dispatched: "yes"
  };

  componentDidMount() {
    axios.get("http://localhost:4000/order/getorder").then(response => {
      console.log(response.data);
      this.setState({
        order: response.data
      });
    });
  }

  Dispatch = orderid => {
    var x = confirm("Are you sure you want to dispatch?"); //eslint-disable-line
    if (x) {
      axios.put(
        "http://localhost:4000/order/updatestatus/" + orderid,
        this.state
      );
      location.reload(); //eslint-disable-line
    } else {
      return false;
    }
  };
  render() {
    const mydata = this.state.order.map(order => {
      return (
        <tr>
          <th scope="row">{order.userid}</th>
          <td>{order.name}</td>
          <td>{order.price}</td>
          <td>{order.billingnumber}</td>
          <td>{order.ordernumber}</td>
          <td>{order.billingaddress}</td>
          <td>{order.dispatched}</td>
          <a>
            {" "}
            <button
              className="btn btn-primary"
              onClick={() => this.Dispatch(order._id)}
            >
              Dispatch
            </button>
          </a>
        </tr>
      );
    });
    return (
      <div className="container-fluid">
        <AdminHeaderComponent/>
        <div className="row">
          <div className="col-sm-12">
            <h1 className="text-center">All Orders</h1>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Userid</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Number</th>
                  <th scope="col">OrderNumber</th>
                  <th scope="col">Address</th>
                  <th scope="col">Dispatch</th>
                  <th scope="col">Want to dispatch?</th>
                </tr>
              </thead>
              <tbody></tbody>

              {mydata}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderComponent;