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
          <HeaderComponent></HeaderComponent>
        <div className="row">
          <div className="col-sm-12">
            <Card>
              <Card.Img
                variant="top"
                src={`http://localhost:4000/uploads/${this.state.product.image}`}
                style={{ width: "1000px", height: "400px" }}
              />
              <Card.Body>
                <Card.Title name="name">{this.state.product.name}</Card.Title>
                <Card.Title name="price">
                  Rs/-{this.state.product.price}
                </Card.Title>
                <Card.Text name="description">
                  Description: {this.state.product.description}
                </Card.Text>
                <Card.Text name="specification">
                  Specification: {this.state.product.specification}
                </Card.Text>
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
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailComponent;