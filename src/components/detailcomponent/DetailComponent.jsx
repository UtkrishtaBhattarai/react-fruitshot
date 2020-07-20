import React from "react";
import axios from "axios";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Button, Form, Card, Col } from "react-bootstrap";
import NavBarComponent from "../usernavigation/NavbarComponent";
import Swal from "sweetalert2";
import "./detailcomponent.css";
import { CardGroup, CardDeck } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { FaUser,FaCommentDots } from "react-icons/fa";

class DetailComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			product: [],
			productid: "",
			comment: [],
			actcomment: "",
			email: localStorage.getItem("email"),
			userid: localStorage.getItem("userid"),
			isRegistered: false,
		};
		this.validator = new SimpleReactValidator();
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	componentDidMount() {
		axios
			.get("http://localhost:4000/product/" + this.props.match.params.id)
			.then((response) => {
				console.log(response.data);
				this.setState({
					product: response.data,
				});
				axios
					.get("http://localhost:4000/comment/" + this.props.match.params.id)
					.then((comment) => {
						this.setState({
							comment: comment.data,
						});
					});
			});
	}

	addtocart = (productid) => {
		this.setState({
			productid: productid,
		});
		console.log(this.state);
		axios
			.post("http://localhost:4000/cart/checkcart/", this.state)
			.then((value) => {
				const khai = value.data.status;
				if (khai == "cantadd") {
					Swal.fire({
						title: "Cannot Add, Already added!",
						text: "You Have already added to the cart",
						icon: "error",
						confirmButtonText: "Cool",
					});
					return;
				} else if (khai == "addhere") {
					Swal.fire({
						title: "Added to the cart!",
						text: "You Have Added to the cart| Please Check your cart",
						icon: "success",
						confirmButtonText: "Cool",
					});
					axios.post("http://localhost:4000/cart/addcart1", this.state);
				}
			});
	};

	addcomment = (productid) => {
		console.log(this.state);
		axios
			.post("http://localhost:4000/comment/addcomment/", this.state)
			.then((value) => {
				this.setState({
					actcomment: "",
				});
				Swal.fire({
					title: "Success!",
					text: "You Have Commented",
					icon: "success",
					confirmButtonText: "Cool",
				});
				window.location.reload()
			});
	};
	render() {
		const mydata = this.state.comment.map((comment) => {
			return (
				<React.Fragment>
					<div className="row">
						<div className="col-sm-12" style={{marginLeft:"10px"}}>
							
							<FaUser/>{comment.email}
							<br></br>
							<FaCommentDots/>{comment.actcomment}<br></br>
						</div>
					</div>
				</React.Fragment>
			);
		});
		return (
			<React.Fragment>
				<div className="container-fluid">
					<script
						async
						defer
						crossorigin="anonymous"
						src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0"
						nonce="DaPSY1D1"
					></script>
					<NavBarComponent />
					<div className="row">
						<div className="col-sm-8">
							<Card.Img
								variant="top"
								src={`http://localhost:4000/uploads/${this.state.product.image}`}
								style={{ width: "", height: "400px" }}
							/>
						</div>
						<div className="col-sm-4">
							<div className="row">
								<div
									class="fb-share-button"
									data-href="https://developers.facebook.com/docs/plugins/"
									data-layout="button"
									data-size="large"
								>
									<a
										target="_blank"
										href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fdetailproduct%2F5efb48e2d3e12f1fc065d2a8&amp;src=sdkpreparse"
										class="fb-xfbml-parse-ignore"
									>
										<img
											style={{ width: "40px", height: "40px" }}
											src={
												"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1024px-Facebook_icon.svg.png"
											}
										/>{" "}
									</a>
								</div>

								<div
									class="fb-share-button"
									data-href="https://developers.facebook.com/docs/plugins/"
									data-layout="button"
									data-size="large"
								>
									<a
										target="_blank"
										href="https://www.facebook.com/sharer/sharer.php?u=https://softwarica.edu.np/&amp;src=sdkpreparse"
										class="fb-xfbml-parse-ignore"
									>
										<img
											style={{ width: "40px", height: "40px" }}
											src={
												"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1024px-Facebook_icon.svg.png"
											}
										/>{" "}
									</a>
								</div>
							</div>
							<div class="card1">
								<h1>{this.state.product.name}</h1>
								<p class="price1"> Rs {this.state.product.price}/-</p>
								<p> Description: {this.state.product.description}</p>
								<p>
									<button
										style={{ marginTop: "160px" }}
										onClick={() => this.addtocart(this.state.product._id)}
									>
										Add to Cart
									</button>
								</p>

								<NavLink to={`/order/${this.state.product._id}`}>
									<p>
										<button style={{ marginTop: "10px", background: "green" }}>
											Buy Now
										</button>
									</p>
								</NavLink>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12" style={{ backgroundColor: "#f2f2f2" }}>
							<Form.Group controlId="exampleForm.ControlTextarea1">
								<Form.Label style={{ fontWeight: "bold", marginLeft: "10px" }}>
									Have a question?
								</Form.Label>
								<Form.Control
									style={{
										border: "1px solid #ccc",
										display: "inline-block",
										boxSizing: "border-box",
										margin: "8px 0",
										borderRadius: "4px",
									}}
									type="text"
									placeholder="Type your question or keyword"
									name="actcomment"
									onChange={this.handleChange}
									value={this.state.actcomment}
								/>
								<Button
									variant="primary"
									onClick={() => this.addcomment(this.state.product._id)}
								>
									Submit
								</Button>
							</Form.Group>
							{this.validator.message(
								"Comment",
								this.state.actcomment,
								"required"
							)}
						</div>

						<p>{mydata}</p>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default DetailComponent;
