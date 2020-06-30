import React from "react";
import axios from "axios";
import "./dashboard.css";
import { Button, Card, Col, Carousel } from "react-bootstrap";
import { Route, NavLink, Switch } from "react-router-dom";
import DetailComponent from "../detailcomponent/DetailComponent";
import HeaderComponent from '../usernavigation/HeaderComponent';
import { Link, Redirect } from "react-router-dom";
import image1 from "./img1.webp";
import image2 from "./img2.webp";
import image3 from "./img3.webp";
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
        <div class="flip-card" style={{ width: "300px", height:'300px', marginLeft:"16px",marginRight:'50px', marginTop:'20px' }}>
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="img_avatar.png" alt="Avatar" src={`http://localhost:4000/uploads/${productlist.image}`} style={{ width: "300px", height:'300px' }}/>
          </div>
          <div class="flip-card-back">
            <h1>{productlist.name}</h1>
            <h3>Rs {productlist.price}/-</h3>
            <NavLink to={`/detailproduct/${productlist._id}`}><p>View More!!</p></NavLink>
          </div>
        </div>
      </div>
      );
    });
    return (
      <div className="container-fluid">
          <HeaderComponent/>
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
              <h3>Fruitshot</h3>
              <p>We deal with the best food and vegetables.</p>
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
              <h3>Quakity</h3>
              <p>We focus on quality</p>
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
              <h3>Affordable</h3>
              <p>We provide quality foods</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <h2 className="text-center alert alert-success edit-me" style={{color:"#FF8C00" }}>View More Products from Fruitshot</h2>
        <div className="row">{mydata}</div>
      </div>
    );
  }
}
export default DashboardComponent;