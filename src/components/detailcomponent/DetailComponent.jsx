import React from "react";
import axios from "axios";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import HeaderComponent from '../usernavigation/HeaderComponent';

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
          alert("You have this item already added to cart");
          return;
        } else if (khai == "addhere") {
          alert("Product added to cart successfully");
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
          <HeaderComponent/>
        <div className="row">
          <div className="col-sm-8">
          <Card.Img
                variant="top"
                src={`http://localhost:4000/uploads/${this.state.product.image}`}
                style={{ width: "", height: "400px" }}
              />
              </div>
              <div className="col-sm-4">
            
              <Card.Body>
               <h1  style={{ color:"#810541" }} className="text-center">Product Name: {this.state.product.name}</h1> 
                <h2 style={{ color:"#E56717", marginTop:"20px" }}> Price : Rs {this.state.product.price}/-</h2> 
                
                <h5 name="description" style={{ color:"#E56717", marginTop:"20px" }}>
                  Description: {this.state.product.description}
                </h5>
                <h5 name="usage" style={{ color:"#E56717", marginTop:"20px", marginBottom:"40px" }}>
                  Usage: {this.state.product.usage}
                </h5>
                <Button
                  variant="primary"
                  onClick={() => this.addtocart(this.state.product._id)}
                >
                  Add to cart
                </Button>
                <NavLink to={`/order/${this.state.product._id}`}>
                  <Button style={{ marginLeft: "10px" }} variant="primary">
                    Buy Now
                  </Button>
                </NavLink>
              </Card.Body>

        </div>
        </div>
      </div>
    );
  }
}

export default DetailComponent;


