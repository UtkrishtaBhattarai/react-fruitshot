import React from "react";
import LoginComponent from "./components/login/LoginComponent";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from "reactstrap";
import mainComponent from "./components/Main";
import NoMatch from "./components/NoMatch";
import RegisterComponent from "./components/registration/RegistrationComponent";



function App() {
  return (
    <BrowserRouter>
      <Switch>
       {/* <LoginComponent></LoginComponent> */}
       <RegisterComponent></RegisterComponent>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App;