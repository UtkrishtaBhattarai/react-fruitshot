import React from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import AdminHeaderComponent from "../adminheader/AdminHeaderComponent";
import { Link, Redirect } from 'react-router-dom';
import './productcomponent.css'
class ProductComponent extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        description: "",
        usage: "",
        currentFile: null,
        image: "",
        price: "",
        productid: null,
        products: []
      };
      this.validator = new SimpleReactValidator();
    }