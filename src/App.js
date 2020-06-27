import React from "react";
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
  )
}
export default App;