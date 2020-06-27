import React from "react";
import image4 from "./image/isok.jpg";
import axios from "axios";
import "./dashboard.css";
import { Button, Card, Col, Carousel } from "react-bootstrap";
import { Route, NavLink, Switch } from "react-router-dom";
import DetailComponent from "../DetailComponent";
import { Link, Redirect } from "react-router-dom";
import HeaderComponent from "../header/HeaderComponent";
import image1 from "./image/a.jpg";
import image2 from "./image/b.jpg";
import image3 from "./image/c.jpg";
class DashboardComponent extends React.Component {
  state = {
    products: [],
    register: {},
    productid: "",
    userid: "",
    config: {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }
  };
  componentDidMount() {
    axios.get("http://localhost:4000/product/getproduct").then(response => {
      console.log(response.data);
      this.setState({
        products: response.data
      });
    });
    axios
      .get("http://localhost:4000/register/me", this.state.config)
      .then(response => {
        console.log(response.data);
        localStorage.setItem("userid", response.data._id);
        this.setState({
          register: response.data,
          userid: response.data._id
        });
      });
  }
  render() {
    const mydata = this.state.products.map(productlist => {
      return (
        <Card style={{ width: "18rem", marginLeft: "3rem", marginTop: "1rem" }}>
          <NavLink to={`/detailproduct/${productlist._id}`}>
            <Card.Img
              variant="top"
              src={`http://localhost:4000/uploads/${productlist.image}`}
              style={{ width: "200px", height: "180px" }}
            />
          </NavLink>
          <Card.Body>
            <Card.Title>{productlist.name}</Card.Title>
            <Card.Title>Rs/-{productlist.price}</Card.Title>
            <Card.Text className="yo">
              Description: {productlist.description}
            </Card.Text>
            <Card.Text className="yo">
              Specification: {productlist.specification}
            </Card.Text>

            <NavLink to={`/detailproduct/${productlist._id}`}>
              <Button variant="primary">View More</Button>
            </NavLink>
          </Card.Body>
        </Card>
      );
    });
    return (
      <div className="container">
        <Carousel>
          <Carousel.Item>
            <img
              width="1000px"
              height="400px"
              className="d-block w-100"
              src={image1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Spare World</h3>
              <p>We deal with all kinds of spare parts.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="400px"
              src={image2}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Bajaj</h3>
              <p>We focus on Bajaj genuine parts</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="400px"
              src={image3}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>BMW</h3>
              <p>We deal with BMW too </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="row">{mydata}</div>
      </div>
    );
  }
}
export default DashboardComponent;
