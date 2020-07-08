import React from "react";
import axios from "axios";
import "./dashboard.css";
import {
	Button,
	Card,
	Col,
	Carousel,
	Form,
	FormControl,
	InputGroup,
} from "react-bootstrap";
import { Route, NavLink, Switch } from "react-router-dom";
import DetailComponent from "../detailcomponent/DetailComponent";
import HeaderComponent from "../usernavigation/HeaderComponent";
import { Link, Redirect } from "react-router-dom";
import image1 from "./img1.webp";
import image2 from "./img2.webp";
import image3 from "./img3.webp";
import "../css/Dashboard.css";
import NavbarComponent from "../usernavigation/NavbarComponent";
import NavBarComponent from "../usernavigation/NavbarComponent";
import SearchComponent from "../search/SearchComponent";
class DashboardComponent extends React.Component {
	state = {
		products: [],
		register: {},
		query: "",
		data: [],
		filteredData: [],
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
	handleInputChange = (event) => {
		const query = event.target.value;

		this.setState((prevState) => {
			const filteredData = prevState.data.filter((element) => {
				return element.name.toLowerCase().includes(query.toLowerCase());
			});

			return {
				query,
				filteredData,
			};
		});
	};

	getData = () => {
		fetch(`http://localhost:4000/product/getproduct`)
			.then((response) => response.json())
			.then((data) => {
				const { query } = this.state;
				const filteredData = data.filter((element) => {
					return element.name.toLowerCase().includes(query.toLowerCase());
				});

				this.setState({
					data,
					filteredData,
				});
			});
	};

	componentWillMount() {
		this.getData();
	}
	render() {
		const mydata = this.state.filteredData.map((products) => {
			return (
				<Card
					className="cardStyles"
					style={{ width: "18rem", marginTop: "10px", marginLeft: "-1rem" }}
				>
					<div className="overflow">
						<NavLink to={`/detailproduct/${products._id}`}>
							<Card.Img
								className="cardImage"
								variant="top"
								style={{ height: "300px", width: "300px" }}
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
						style={{ width: "1140px", height: "400px" }}
						src={`http://localhost:4000/uploads/${slider.image}`}
						alt="First slide"
					/>
				</Carousel.Item>
			);
		});

		return (
			<React.Fragment>
				<NavBarComponent></NavBarComponent>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<Carousel indicators={false} style={{ marginTop: "-0.4rem" }}>
								{slider}
							</Carousel>
							<InputGroup className="mb-3" style={{marginTop:"15px"}}>
								<FormControl
									style={{
										backgroundColor: "rgb(97, 63, 153)",
										color: "white",
									}}
									placeholder="Search"
									aria-label="Search"
									aria-describedby="basic-addon1"
									value={this.state.query}
									onChange={this.handleInputChange}
								/>
							</InputGroup>
						</div>
						{mydata}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default DashboardComponent;
