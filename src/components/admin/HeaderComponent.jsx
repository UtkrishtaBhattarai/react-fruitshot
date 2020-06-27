import React from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
//import AdminDashboardComponent from './AdminDashboardComponent'
import "bootstrap/dist/css/bootstrap.css"
// import AddNotification from './AddNotification'
// import ProductComponent from './ProductComponent'
// import BajajProductComponent from './BajajproductComponent'
// import OrderComponent from './OrderComponent'
// import CartComponent from '../cart/CartComponent'
class HeaderComponent extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/admin">Home</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/addnotification">Notification</a>
                            </li>

                            <li className="nav-item active">
                                <a className="nav-link" href="/productsadd">Products</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/bajajproduct">Bajaj Products</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/orders">Orders</a>
                            </li>

                            {/* <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li> */}
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav >
                <Switch>
                    {/* <Route path="/admin" component={AdminDashboardComponent} />
                    <Route path="/addnotification" component={AddNotification} />
                    <Route path="/productsadd" component={ProductComponent} />
                    <Route path="/bajajproduct" component={BajajProductComponent} />
                    <Route path="/orders" component={OrderComponent} /> */}

                </Switch>

            </div>
        )
    }
}
export default HeaderComponent