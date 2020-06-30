import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import RegisterComponent from "../registration/RegistrationComponent";
import LoginComponent from "../login/LoginComponent";
import DashboardComponent from "../dashboard/DashboardComponent";
// import AboutComponent from "../aboutus/AboutComponent";
import "bootstrap/dist/css/bootstrap.css";
import PrivateRoute from "../PrivateRoute";
// import DetailComponent from "../DetailComponent";
// import CartComponent from "../cart/CartComponent";
// import UserOrderComponent from "../userorder/UserOrderComponent";
// import MyOrderComponent from "../myorder/MyOrderComponent";
// import OrderStatusComponent from "../orderstatus/OrderStatusComponent";
// import NotificationComponent from "../notifications/NotificationComponent";
class HeaderComponent extends React.Component {
  state = {
    userid: localStorage.getItem("userid")
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/register">
                  Register{" "}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  AboutUS
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  Cart
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/myorders">
                  Orders
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/checkorder">
                  Check Order
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/notification">
                  Notification
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
        <Switch>
          <Route path="/register" component={RegisterComponent} />
          <Route path="/login" component={LoginComponent} />
         
          {/* <Route path="/about" component={AboutComponent} />
          <PrivateRoute path="/profile" component={ProfileComponent} />
         
          <Route path="/cart" component={CartComponent} />
          <Route path="/myorders" component={MyOrderComponent} />
          <Route path="/order/:id" component={UserOrderComponent} />
          <Route path="/checkorder" component={OrderStatusComponent} />
          <Route path="/notification" component={NotificationComponent} /> */}
        </Switch>
      </div>
    );
  }
}
export default HeaderComponent;