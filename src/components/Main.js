import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import UserHeader from './header/HeaderComponent'
export default class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={App} />
               <Route exact path='userdashboard' component={UserHeader}/>
            </BrowserRouter>
        )
    }
}