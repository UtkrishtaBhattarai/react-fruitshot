import React, { Component } from "react";

import axios from "axios";

import { Card, Button } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaMoneyBill } from "react-icons/fa";

import Swal from "sweetalert2";

class ProductDetails extends Component {
	state = {
		products: [],
		productid: "",
		userid: localStorage.getItem("userid"),
	};

	componentDidMount() {
		axios
			.get("http://localhost:4000/product/" + this.props.match.params.id)
			.then((response) => {
				console.log(response.data);
				this.setState({
					products: response.data,
				});
			});
	}
	addtocart = (productidw) => {
		this.setState({
			productid: productidw,
		});
		console.log(this.state);
		axios
			.post("http://localhost:4000/cart/checkcart1/", this.state)
			.then((value) => {
				const khai = value.data.status;

				if (khai === "cantadd") {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "This item is already in the cart!",
					});
				} else if (khai === "addhere") {
					Swal.fire("Task Successful!", "Item added to the cart!", "success");
					console.log(this.state);
					axios.post("http://localhost:4000/cart/addcart1", this.state);
				}
			});
	};
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="row" style={{ marginTop: "0.5rem" }}>
						<div className="col-md-4">
							<Card>
								<Card.Img
									style={{ transform: "none" }}
									className="cardImage"
									variant="top"
									src={`http://localhost:4000/uploads/${this.state.products.image}`}
								/>
							</Card>
						</div>
						<div className="col-md-8">
							<div className="row">
								<div className="col-md-12">
									<Card>
										<Card.Body>
											<Card.Title>{this.state.products.name}</Card.Title>
											<Card.Title style={{ color: "#f57224", fontSize: "2em" }}>
												Rs. {this.state.products.price}
											</Card.Title>
											<Card.Title>Description</Card.Title>
											<Card.Subtitle>
												{this.state.products.description}
											</Card.Subtitle>
											<br />

											<Button
												variant="primary btn btn-block"
												style={{ backgroundColor: "#3ea89f" }}
												onClick={() => this.addtocart(this.state.products._id)}
											>
												Add to cart <FaShoppingCart></FaShoppingCart>
											</Button>
											<br />
											<NavLink to={`/order/${this.state.products.productid}`}>
												<Button
													style={{ backgroundColor: "#3ea89f" }}
													variant="success btn btn-block"
												>
													Buy Now <FaMoneyBill></FaMoneyBill>
												</Button>
											</NavLink>
										</Card.Body>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="commentbox"
					style={{ backgroundColor: "black", height: "50px" }}
				></div>
			</React.Fragment>
		);
	}
}

export default ProductDetails;
