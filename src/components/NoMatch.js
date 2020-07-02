import React from 'react'
import './nomatch.scss'
import { NavLink } from 'react-router-dom'
import NavBarComponent from './usernavigation/NavbarComponent'

export default function NoMatch() {
    return (
        <html>
            <NavBarComponent></NavBarComponent>
            <link href="https://fonts.googleapis.com/css?family=Encode+Sans+Semi+Condensed:100,200,300,400" rel="stylesheet"/>
<body class="">
  <h1>404</h1>
  <h2>Page Not Found <b>:(</b></h2>
  <div class="gears">
    <div class="gear one">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="gear two">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="gear three">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
  <script src="js/main.js" type="text/javascript"></script>
</body>
<NavLink to="/"><h1>homepage</h1></NavLink>
        </html>
    )
}