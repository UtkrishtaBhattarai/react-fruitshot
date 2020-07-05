import React from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import NavBarComponent from "../usernavigation/NavbarComponent";
import "./myorder.scss"

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

  deletecart = (productid) => {
    var x = confirm("Are you sure you want to cancel order?");//eslint-disable-line
    if (x) {

        axios.delete("http://localhost:4000/order/deleteorder/" + productid);
        location.reload();//eslint-disable-line
    }
    else {
        return false;
    }

}
  render() {
    if (localStorage.getItem("userid") == null) {
      return <Redirect to="/login" />;
    }
    const mydata = this.state.cart.map(cart => {
      return (
        <div class="card" style={{marginLeft:"50px", marginRight:"10px", marginTop:"20px"}}>
                   
        <img src={`http://localhost:4000/uploads/${cart.image}`} alt="Denim Jeans" style={{width:"100%",height:"200px"}}/>
        <h1>{cart.name}</h1>
        <p class="price">Rs {cart.grandtotal} /-</p>
      <p>Quantity:{cart.quantity}</p>
        <p><button onClick={() => this.deletecart(cart._id)}>Cancel Order</button></p>
      </div>
      );
    });
    return (
      <div>
      <NavBarComponent></NavBarComponent>
      <div className="container-fluid">
          <h3 className="alert alert-success text-center">Order History</h3>
          <div className="row">
            <div className="col-sm-12">
              {mydata}
          </div>
      </div>
      </div>
      </div>
    );
  }
}

export default MyOrderComponent;