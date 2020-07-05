import React from "react";
import LoginComponent from "./components/login/LoginComponent";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "reactstrap";
import mainComponent from "./components/Main";
import NoMatch from "./components/NoMatch";
import DashboardComponent from "./components/dashboard/DashboardComponent";
import RegisterComponent from "./components/registration/RegistrationComponent";
import AdminLoginComponent from "./components/admin/AdminLoginComponent";
import UserViewAdminComponent from "./components/admin/userviewadmin/UserViewAdminComponent";
import AdminHeaderComponent from "./components/admin/adminheader/AdminHeaderComponent";
import ProductComponent from "./components/admin/addproduct/ProductComponent";
import DetailComponent from "./components/detailcomponent/DetailComponent";
import AdBlockDetect from "react-ad-block-detect";
import Swal from "sweetalert2";
import PrivateRoute from "../src/components/PrivateRoute";
import ProfileComponent from "./components/profile/ProfileComponent";
import SliderComponent from "./components/admin/slideradd/SliderComponent";
import CartComponent from "./components/cart/CartComponent"
import UserOrderComponent from "./components/userorder/UserOrderComponent"
import OrderComponent from "./components/admin/vieworder/OrderComponent"
import OrderStatusComponent from "./components/orderstatus/OrderStatusComponent"
import MyOrderComponent from "./components/myorders/MyOrderComponent"
import DeleteProfileComponent from "./components/deleteprofile/DeleteProfileComponent"
function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={LoginComponent} />
				<Route path="/register" component={RegisterComponent} />
				<Route exact path="/" component={DashboardComponent} />
				<Route exact path="/dashboard" component={DashboardComponent} />
				<Route path="/adminlogin" component={AdminLoginComponent} />
				<Route path="/admin/viewusers" component={UserViewAdminComponent} />
				<Route path="/admin/productsadd" component={ProductComponent} />
				<Route path="/detailproduct/:id" exact component={DetailComponent} />
				<Route path="/admin/slider" component={SliderComponent} />
				<PrivateRoute path="/profile" component={ProfileComponent} />
				<PrivateRoute path="/deleteprofile" component={DeleteProfileComponent} />
				<Route path="/cart" component={CartComponent} />
				 <Route path="/orders" component={OrderComponent} />
				<Route path="/order/:id" component={UserOrderComponent} />
				<Route path="/checkorder" component={OrderStatusComponent} />
				<Route path="/myorders" component={MyOrderComponent} />
				<Route>
					<NoMatch />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
