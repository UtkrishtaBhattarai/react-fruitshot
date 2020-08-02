import React from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import AdminHeaderComponent from "../adminheader/AdminHeaderComponent";
import { Link, Redirect } from 'react-router-dom';
import './productcomponent.css'
class ProductComponent extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        description: "",
        usage: "",
        currentFile: null,
        image: "",
        price: "",
        productid: null,
        products: []
      };
      this.validator = new SimpleReactValidator();
    }
    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
      componentDidMount() {
        axios.get("http://localhost:4000/product/getproduct").then(response => {
          console.log(response.data);
          this.setState({
            products: response.data
          });
        });
      }
    
      handleFileChange = e => {
        this.setState({
          currentFile: e.target.files[0]
        });
      };
    
      handleSubmit = e => {
        if (this.validator.allValid()) {
          e.preventDefault();
          let data = new FormData();
          console.log(this.currentFile);
          console.log(data);
          data.append("imageFile", this.state.currentFile);
          axios
            .post("http://localhost:4000/upload", data)
            .then(response => {
              console.log(response.data);
              axios
                .post("http://localhost:4000/product/addproducts", {
                  name: this.state.name,
                  image: response.data.filename,
                  description: this.state.description,
                  usage: this.state.usage,
                  price: this.state.price
                })
                .then(response => {
                  console.log(response.data);
                  this.setState({
                    name: "",
                    image: "",
                    description: "",
                    usage: "",
                    price: ""
                  });
                  alert("Added Product");
                  window.location.reload();
                })
                .catch(err => console.log(err.response));
            })
            .catch(err => console.log(err));
        } else {
          this.validator.showMessages();
          this.forceUpdate();
        }
      };
    
      deleteproduct = productid => {
        var x = confirm("Are you sure you want to delete?"); //eslint-disable-line
        if (x) {
          axios.delete("http://localhost:4000/product/deleteproduct/" + productid);
          location.reload(); //eslint-disable-line
        } else {
          return false;
        }
      };
    
      updateproduct = id => {
        axios.get("http://localhost:4000/product/" + id).then(response => {
          console.log(response.data);
          this.setState({
            name: response.data.name,
            description: response.data.description,
            usage: response.data.usage,
            price: response.data.price
          });
        });
      };
      updateData = productid => {
        axios
          .put("http://localhost:4000/product/updateproduct/" + productid, {
            name: this.state.name,
            description: this.state.description,
            usage:this.state.usage,
            price: this.state.price
          })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
        window.location.reload();
      };
    
      render() {
        if (localStorage.getItem("a_token") != "tokenhoma") {
              return <Redirect to="/adminlogin" />;
            }
        const mydata = this.state.products.map(products => {
          return (
            <tr>
              <th onClick={() => this.updateproduct(products._id)} scope="row">
                {products.name}
              </th>
              <td onClick={() => this.updateproduct(products._id)}>
                {products.description}
              </td>
              <td onClick={() => this.updateproduct(products._id)}>
                {products.usage}
              </td>
              <td onClick={() => this.updateproduct(products._id)}>
                {products.price}
              </td>
              <td>
                <a>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.updateData(products._id)}
                  >
                    Update
                  </button>
                </a>
              </td>
    
              <td>
                <a>
                  {" "}
                  <button
                    className="btn btn-primary"
                    onClick={() => this.deleteproduct(products._id)}
                  >
                    Delete
                  </button>
                </a>
              </td>
            </tr>
          );
        });
    
        return (
          <div class="container-fluid">
            <AdminHeaderComponent/>
            <div class="row">
              <div class=" col-sm-12">
              <form class="form-style-9">
    <ul>
    <li>
    
        <input type="text" name="name"
                          autofocus
                          value={this.state.name}
                          onChange={this.handleChange}
                           class="field-style field-split align-left" placeholder="Name" />
                           {this.validator.message(
                          "Name",
                          this.state.name,
                          "required"
                        )}
    
    
                         
        <input type="number" required
                          name="price"
                          value={this.state.price}
                          onChange={this.handleChange}  class="field-style field-split align-right" placeholder="Price" />
                       {this.validator.message(
                          "Price",
                          this.state.price,
                          "required|number"
                        )}   
    
    </li>
    <br></br>
    <li>
    <textarea  class="field-style" required
                          name="usage"
                          value={this.state.usage}
                          onChange={this.handleChange} placeholder="Usage"></textarea>
                           {this.validator.message(
                          "Usage",
                          this.state.usage,
                          "required"
                        )}
    </li>
    <li>
    <textarea name="field5" class="field-style" placeholder="Description"  required
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChange}></textarea>
    </li>
    <li>
    <input type="file" name="field5" class="field-style" placeholder="Description"  required
                          onChange={this.handleFileChange}/>
    </li>
    <li>
    <button
                        class="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        {this.state.formvalue}Add product
                      </button>
    </li>
    </ul>
    </form>
              </div>
            </div>
            <div className="row">
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Specification</th>
                    <th scope="col">Price</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>{mydata}</tbody>
              </table>
            </div>
          </div>
        );
      }
    }
    
    export default ProductComponent;
    