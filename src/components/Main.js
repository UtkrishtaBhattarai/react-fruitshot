import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
export default class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={App} />
              
            </BrowserRouter>
        )
    }
}