import React, { Component } from "react";

import { Form, Button } from "react-bootstrap";

import axios from "axios";

class CouponComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentFile: null,
			image: ""
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleFileChange = e => {
		this.setState({
			currentFile: e.target.files[0]
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		let data = new FormData();
		console.log(this.currentFile);
		console.log(data);
		data.append("imageFile", this.state.currentFile);

		axios
			.post("http://localhost:4000/upload/", data)
			.then(response => {
				console.log(response.data);
				axios
					.post("http://localhost:4000/slider/addslider", {
						image: response.data.filename
					})
					.then(response => {
						console.log(response.data);
						this.setState({
							image: ""
						});
					})
					.catch(err => console.log(err.response));
			})
			.catch(err => console.log(err));

		alert("Slider added");
	};

	

	render() {
		return (
			<React.Fragment>
				<h2>Select Slider Image</h2>
				<Form.Control
					className="file"
					type="file"
					onChange={this.handleFileChange}
					name="image"
				/>
				<br />
				<Button variant="primary" size="md" block onClick={this.handleSubmit}>
					{this.state.formvalue}
					Add Slider
				</Button>
			</React.Fragment>
		);
	}
}

export default CouponComponent;
