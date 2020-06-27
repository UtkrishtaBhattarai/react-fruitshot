import React from "react";
<<<<<<< HEAD
import LoginComponent from "./components/login/LoginComponent";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from "reactstrap";
import AdminLogin from "./components/admin/HeaderComponent";
import mainComponent from "./components/Main";
import NoMatch from "./components/NoMatch";
import HeaderComponent from "./components/header/HeaderComponent";

import RegisterComponent from "./components/register/RegisterComponent";
// import DashboardComponent from "./components/dashboard/DashboardComponent";
// import DetailComponent from "./components/DetailComponent";
// import PrivateRoute from "./components/PrivateRoute";
// import ProfileComponent from "./components/profile/ProfileComponent";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HeaderComponent></HeaderComponent>
        {/* <AdminLogin></AdminLogin> */}
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
=======
import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Test react
				</a>
			</header>
		</div>
	);
>>>>>>> 6daa4e86028c3020f0fd3c4a4705d716a96d1ba4
}
export default App;