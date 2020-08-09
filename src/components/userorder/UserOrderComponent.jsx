import React, { Component } from "react";
import { Button, Form, Col, Card } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import NavBarComponent from "../usernavigation/NavbarComponent";
import DarkModeToggle from "../darkmode/DarkModeToggle";


class OrderComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			name: "",
			fname:localStorage.getItem("name"),
			price: "",
			email:localStorage.getItem("email"),
      billingaddress: "",
      quantity:1,
      billingnumber: "",
      grandtotal: "",
			ordernumber: "",
      userid: localStorage.getItem("userid"),
      isordered: false,
      nor:  Math.floor(Math.random() * 10000 + 12)
		};
		this.validator = new SimpleReactValidator();
	}

	handleChange = e => {
		this.setState({
      [e.target.name]: e.target.value
    });
	};

	handleSubmit = e => {	
    
    e.preventDefault();
		console.log(this.state.products.name);
		if (this.validator.allValid()) {

		axios
			.post("http://localhost:4000/order/addorder1", this.state)
			.then(response => {
				console.log(response);
				this.setState({
					name: "",
					price: "",
					billingaddress: "",
					billingnumber: "",
          ordernumber: Math.floor(Math.random() * 1000 + 12),
          isordered:true,
          quantity:"",
          grandtotal:""
				});
				axios.post("http://localhost:4000/email/email",this.state);
				Swal.fire(
					"Order Successful!",
					"Your order has been placed successfully!" +  this.state.nor + "Is your order ID",
          "success",
          

        );
			})
			.catch(err => console.log(err));
		}
		else {
			this.validator.showMessages();
			this.forceUpdate();
		}
	};

	componentDidMount() {
    this.setState({
			ordernumber:this.state.nor
    });
		axios
			.get("http://localhost:4000/product/" + this.props.match.params.id)
			.then(response => {
				console.log(response.data);
				this.setState({
					products: response.data
        });
        this.setState({
          grandtotal:	 (this.state.products.price*0.13 + this.state.products.price)*this.state.quantity
        })
			});
	}

	render() {
		if (localStorage.getItem("userid") == null) {
			return <Redirect to="/login" />;
    }
    if (this.state.isordered === true) {
      return <Redirect to="/" />;
    }

		return (
			<React.Fragment>
				<div className="container-fluid">
          <NavBarComponent/>
		  <DarkModeToggle/>
					<div className="row" style={{ marginTop: "0.5rem" }}>
						<div className="col-md-8">
							<div style={{ fontWeight: "bold" }}>
								Enter address to continue
							</div>
							<div style={{ backgroundColor: "#ebf3fd" }}>
								<div style={{ margin: "1rem" }}>
									<Form>
										<Form.Group controlId="formGridAddress1">
											<Form.Label>Address</Form.Label>
											<Form.Control
												placeholder="1234 Main St"
												name="billingaddress"
												onChange={this.handleChange}
											/>
											
											{this.validator.message(
												"Billing address",
												this.state.billingaddress,
												"required|alpha_num_space"
											)}
										</Form.Group>

										<Form.Group controlId="formGridAddress2">
											<Form.Label>Phone Number</Form.Label>
											<Form.Control
												placeholder="Enter phone number"
												name="billingnumber"
												onChange={this.handleChange}
											/>
											{this.validator.message(
												"Billing number",
												this.state.billingnumber,
												"required|phone"
											)}
										</Form.Group>

                    <Form.Group controlId="formGridAddress2">
											<Form.Label>Quantity</Form.Label>
                      <select  name="quantity"
                        type="number"
												onChange={this.handleChange} className="form-control" id="cars">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
											{this.validator.message(
												"Quanity ",
												this.state.quantity,
												"required|number"
											)}
										</Form.Group>

                   

										<Form.Group controlId="formGridAddress2">
											<Form.Label>Order Number</Form.Label>
											<Form.Control
												value={this.state.ordernumber}
												name="ordernumber"
												onChange={this.handleChange}
												disabled
											/>
										</Form.Group>

										<Form.Row>
											<Form.Group as={Col} controlId="formGridCity">
												<Form.Label>City</Form.Label>
												<Form.Control value="Kathmandu" disabled/>
											</Form.Group>

											<Form.Group as={Col} controlId="formGridState">
												<Form.Label>State</Form.Label>
												<Form.Control as="select" disabled>
													<option>Choose...</option>
													<option>...</option>
												</Form.Control>
											</Form.Group>

											<Form.Group as={Col} controlId="formGridZip">
												<Form.Label>Zip</Form.Label>
												<Form.Control value="44600" disabled />
											</Form.Group>
										</Form.Row>

										<Form.Group id="formGridCheckbox">
											<Form.Check
												type="checkbox"
												label="Use this address for future orders"
											/>
										</Form.Group>
									</Form>
								</div>
							</div>
						</div>
						<div className="col-md-4" style={{ backgroundColor: "#e5e9ec" }}>
							<div
								className="divItem"
								style={{
									backgroundColor: "rgb(97, 63, 153)",
									color: "white",
									marginTop: "0.5rem",
									marginBottom: "0.5rem",
									paddingLeft: "1rem",
									fontWeight: "bold",
									marginLeft: "-0.9rem",
									marginRight: "-0.9rem"
								}}
							>
								Order Summary
							</div>
							<div
								style={{
									paddingLeft: "0.5rem",
									backgroundColor: "#fff",
									marginBottom: "0.5rem",
									marginLeft: "-0.5rem",
									marginRight: "-0.5rem"
								}}
							>
								<p>{this.state.products.name}</p>

								<p style={{ color: "#3ea89f", fontSize: "2em" }}>
									Rs. {this.state.products.price}
								</p>
								<p>Tax: 13%</p>
								<p>Shipping: 0</p>
              <p>Quantity:{this.state.quantity}</p>
								<hr
									style={{
										marginTop: "1rem",
										marginBottom: "1rem",
										border: "1",
										borderTop: "2px solid rgba(0,0,0,0.1)"
									}}
								/>
								<div style={{ textAlign: "right" }}>
									<p
										style={{
											fontWeight: "bold",
											marginRight: "0.5rem",
											marginBottom: "-0.1rem"
										}}
									>
										Grand Total:{" "}
                    <h2 style={{ color: "#3ea89f" }} name="grandtotal" 	onChange={this.handleChange} >
                   
											Rs.{" "}
											{ (this.state.products.price*0.13 + this.state.products.price)*this.state.quantity}
										</h2>
									</p>
								</div>
							</div>
							<Button
								type="submit"
								onClick={this.handleSubmit}
								style={{
									marginBottom: "1.5rem",
									backgroundColor: "#3ea89f",
									fontWeight: "bold",
									color: "#fff"
								}}
								variant=" Light btn-block"
							>
								Checkout
							</Button>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default OrderComponent;