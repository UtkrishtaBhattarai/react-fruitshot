import React from "react";
import axios from "axios";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import HeaderComponent from '../usernavigation/HeaderComponent';
import NavBarComponent from "../usernavigation/NavbarComponent";
import Swal from 'sweetalert2';
import './detailcomponent.scss'

class DetailComponent extends React.Component {
  state = {
    product: [],
    productid: "",
    userid: localStorage.getItem("userid")
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/product/" + this.props.match.params.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          product: response.data
        });
      });
  }

  addtocart = productid => {
    this.setState({
      productid: productid
    });
    console.log(this.state);
    axios
      .post("http://localhost:4000/cart/checkcart/", this.state)
      .then(value => {
        const khai = value.data.status;
        if (khai == "cantadd") {
          Swal.fire({
            title: 'Cannot Add, Already added!',
            text: 'You Have already added to the cart',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
          return;
        } else if (khai == "addhere") {
          Swal.fire({
            title: 'Added to the cart!',
            text: 'You Have Added to the cart| Please Check your cart',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          axios.post("http://localhost:4000/cart/addcart1", this.state);
        }
      });
  };
  render() {
    if (localStorage.getItem("userid") == null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container-fluid">
          <NavBarComponent/>
        <div className="row">
          <div className="col-sm-8">
          <Card.Img
                variant="top"
                src={`http://localhost:4000/uploads/${this.state.product.image}`}
                style={{ width: "", height: "400px" }}
              />
              </div>
              <div className="col-sm-4">
            
              <div class="card1">
  <h1>{this.state.product.name}</h1>
  <p class="price1"> Rs {this.state.product.price}/-</p>
  <p> Description: {this.state.product.description}</p>
  <p><button style={{marginTop:"160px"}} onClick={() => this.addtocart(this.state.product._id)}>Add to Cart</button></p>
  
  <NavLink to={`/order/${this.state.product._id}`}>
  <p><button style={{marginTop:"10px", background:"green"}}>Buy Now</button></p>
                </NavLink>
</div>

        </div>
        </div>
      </div>
    );
  }
}

export default DetailComponent;


