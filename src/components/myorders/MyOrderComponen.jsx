import React from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import axios from "axios";

class MyOrderComponent extends React.Component {
  state = {
    cart: []
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/order/checkorder/" +
          localStorage.getItem("userid")
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          cart: response.data
        });
      });
  }
  render() {
    if (localStorage.getItem("userid") == null) {
      return <Redirect to="/login" />;
    }
    const mydata = this.state.cart.map(cart => {
      return (
        <div class="container">
          <table id="cart" class="table table-hover table-condensed">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Name</th>
                <th> Address</th>
                <th> Number</th>
                <th style={{ width: "10%" }}>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-th="Product">
                  <div class="row">
                    <div class="col-sm-12">
                      <h4 class="nomargin">{cart.name}</h4>
                      <p>{cart.specification}</p>
                    </div>
                  </div>
                </td>
                <td data-th="Subtotal" class="text-center">
                  {cart.billingaddress}
                </td>
                <td data-th="Subtotal" class="text-center">
                  {cart.billingnumber}
                </td>
                <td data-th="Subtotal" class="text-center">
                  {cart.price}
                </td>

                <td data-th="Subtotal" class="text-center">
                  {cart.quantity}
                </td>
                <td data-th="Subtotal" class="text-center">
                  {cart.quantity * cart.price}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div class="table-responsive">
            <table class="table" id="table">
              <h1 className="text-center">Your Orders</h1>
              {mydata}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MyOrderComponent;