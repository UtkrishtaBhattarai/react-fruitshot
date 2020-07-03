import React, { Component } from "react";
import Swal from 'sweetalert2';
import { Form, Button } from "react-bootstrap";
import AdminHeaderComponent from "../adminheader/AdminHeaderComponent";
import { Link, Redirect } from 'react-router-dom';

import axios from "axios";

class CouponComponent extends Component {
	
		state = {
			currentFile: null,
			image: "",
			slider:[]
		};

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

	componentDidMount() {
		axios.get("http://localhost:4000/slider/getslider").then(response => {
		  console.log(response.data);
		  this.setState({
			slider: response.data
		  });
		});
	  }

	  deleteslider = sliderid => {
		var x = confirm("Are you sure you want to delete?"); //eslint-disable-line
		if (x) {
			Swal.fire({
				title: 'Success!',
				text: 'You Have Deleted the image',
				icon: 'success',
				confirmButtonText: 'Cool'
			  })
		  axios.delete("http://localhost:4000/slider/deleteslider/" + sliderid);
		  location.reload(); //eslint-disable-line
		} else {
		  return false;
		}
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
						location.reload(); //eslint-disable-line
					})
					.catch(err => console.log(err.response));
			})
			.catch(err => console.log(err));

			Swal.fire({
				title: 'Success!',
				text: 'You Have Added',
				icon: 'success',
				confirmButtonText: 'Cool'
			  })
			  
	};

	

	render() {
		if (localStorage.getItem("a_token") != "tokenhoma") {
		  return <Redirect to="/adminlogin" />;
		}
		const mydata = this.state.slider.map(slider => {
		  return (
			
			<tr>
			  <th scope="row">{slider._id}</th>
			  <td><img style={{width:"100px", height:"100px"}} src={`http://localhost:4000/uploads/${slider.image}`}
></img></td>
			  <a>
				{"  "}
				<button
				  className="btn btn-primary"
				  onClick={() => this.deleteslider(slider._id)}
				>
				  Delete
				</button>
			  </a>
			</tr>
		  );
		});
		return (
		  
		  <div className="container-fluid">
			<AdminHeaderComponent/>
			<div className="row">
			<div class=" col-sm-12">
<form class="form-style-9">
<ul>
<li>

<React.Fragment>
				<h3 className="text-center">Select Slider Image</h3>
				<Form.Control
					className="file"
					required
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
</li>
</ul>
</form>
</div>
					<h1 className="text-center">All Slider Images</h1>
					<table id="myTable" class="table table-dark">
					  <thead>
						<tr class="header">
						  <th scope="column1">ID</th>
						  <th scope="column2">Image</th>
						  <th scope="column2">Delete</th>
						</tr>
					  </thead>
					  <tbody>{mydata}</tbody>
					</table>
				</div>
			  </div>
		);
	  }
	}
	

export default CouponComponent;
