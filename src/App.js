import React from "react";
import LoginComponent from "./components/login/LoginComponent";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from "reactstrap";
import mainComponent from "./components/Main";
import NoMatch from "./components/NoMatch";
import DashboardComponent from './components/dashboard/DashboardComponent'
import RegisterComponent from "./components/registration/RegistrationComponent";
import AdminLoginComponent from "./components/admin/AdminLoginComponent";
import UserViewAdminComponent from "./components/admin/userviewadmin/UserViewAdminComponent";
import AdminHeaderComponent from "./components/admin/adminheader/AdminHeaderComponent";
import ProductComponent from "./components/admin/addproduct/ProductComponent";
import DetailComponent from './components/detailcomponent/DetailComponent';



function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path='/' component={LoginComponent} />
          <Route path='/register' component={RegisterComponent} />
          <Route path='/dashboard' component={DashboardComponent} />
          <Route path='/adminlogin' component={AdminLoginComponent} />
          <Route path='/admin/viewusers' component={UserViewAdminComponent} />
          <Route path='/admin/productsadd' component={ProductComponent}/>
          <Route path="/detailproduct/:id" exact component={DetailComponent} />
          
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App;