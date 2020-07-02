import React from "react";
import axios from "axios";
import "./dashboard.css";
import { Button, Card, Col, Carousel } from "react-bootstrap";
import { Route, NavLink, Switch } from "react-router-dom";
import DetailComponent from "../detailcomponent/DetailComponent";
import HeaderComponent from "../usernavigation/HeaderComponent";
import { Link, Redirect } from "react-router-dom";
import image1 from "./img1.webp";
import image2 from "./img2.webp";
import image3 from "./img3.webp";
import "../css/Dashboard.css";
class DashboardComponent extends React.Component {
	state = {
		products: [],
		register: {},
		slider: [],
		productid: "",
		userid: "",
		config: {
			headers: { Authorization: "Bearer " + localStorage.getItem("token") },
		},
	};
	componentDidMount() {
		axios.get("http://localhost:4000/product/getproduct").then((response) => {
			console.log(response.data);
			this.setState({
				products: response.data,
			});
		});
		axios
			.get("http://localhost:4000/register/me", this.state.config)
			.then((response) => {
				console.log(response.data);
				localStorage.setItem("userid", response.data._id);
				this.setState({
					register: response.data,
					userid: response.data._id,
				});
			});
		axios.get("http://localhost:4000/slider/getSlider").then((response1) => {
			console.log(response1.data);
			this.setState({
				slider: response1.data,
			});
		});
	}
	render() {
		const mydata = this.state.products.map((products) => {
			return (
				<Card
					className="cardStyles"
					style={{ width: "18rem", marginTop: "2rem", marginLeft: "2rem" }}
				>
					<div className="overflow">
						<NavLink to={`/detailproduct/${products._id}`}>
							<Card.Img
								className="cardImage"
								variant="top"
								src={`http://localhost:4000/uploads/${products.image}`}
							/>
						</NavLink>
					</div>
					<Card.Body>
						<Card.Title style={{ color: "#f57224" }}>
							Rs. {products.price}
						</Card.Title>
						<Card.Text
							style={{
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{products.name}
						</Card.Text>
					</Card.Body>
				</Card>
			);
		});
		const slider = this.state.slider.map((slider) => {
			return (
				<Carousel.Item>
					<img
						className="d-block w-100"
						src={`http://localhost:4000/uploads/${slider.image}`}
						alt="First slide"
					/>
				</Carousel.Item>
			);
		});

		return (
			<React.Fragment>
				<HeaderComponent></HeaderComponent>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
            <Carousel indicators={false} style={{ marginTop: "0.5rem" }}>
								{slider}
							</Carousel>
						</div>
						{mydata}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default DashboardComponent;
