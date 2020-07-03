import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import ProductComponent from "../addproduct/ProductComponent";
import UserViewAdminComponent from "../userviewadmin/UserViewAdminComponent";
import SliderComponent from "../slideradd/SliderComponent";
class AdminHeaderComponent extends React.Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="/admin/viewusers">
						Home
					</a>
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
								<a className="nav-link" href="/addnotification">
									Notification
								</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" href="/admin/productsadd">
									Products
								</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" href="/admin/slider">
									Slider
								</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" href="/orders">
									Orders
								</a>
							</li>

						</ul>
					</div>
				</nav>
				<Switch>
					{/* <Route path="/orders" component={OrderComponent} /> */}
				</Switch>
			</div>
		);
	}
}
export default AdminHeaderComponent;
