import React from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
class ProductComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      specification: "",
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
              specification: this.state.specification,
              price: this.state.price
            })
            .then(response => {
              console.log(response.data);
              this.setState({
                name: "",
                image: "",
                description: "",
                specification: "",
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
        specification: response.data.specification,
        price: response.data.price
      });
    });
  };
  updateData = productid => {
    axios
      .put("http://localhost:4000/product/updateproduct/" + productid, {
        name: this.state.name,
        description: this.state.description,
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
            {products.specification}
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
      <div class="container">
        <div class="row">
          <div className="col-sm-2"></div>
          <div class=" col-sm-8">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h2 class="card-title text-center">Products</h2>
                <form name="myForm" onSubmit={this.handleSubmit}>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="name"
                      autofocus
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Name",
                      this.state.name,
                      "required"
                    )}
                    <label for="inputEmail">Name</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="specification"
                      value={this.state.specification}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Specification",
                      this.state.specification,
                      "required"
                    )}
                    <label for="inputEmail">Specification</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Description",
                      this.state.description,
                      "required"
                    )}
                    <label for="inputEmail">Description</label>
                  </div>
                  <div></div>
                  <div class="form-label-group">
                    <input
                      type="number"
                      id="inputEmail"
                      class="form-control"
                      required
                      name="price"
                      value={this.state.price}
                      onChange={this.handleChange}
                    />
                    {this.validator.message(
                      "Name",
                      this.state.price,
                      "required|number"
                    )}
                    <label for="inputEmail">Price</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="file"
                      id="inputEmail"
                      class="form-control"
                      required
                      onChange={this.handleFileChange}
                    />
                    <label for="inputEmail">Image</label>
                  </div>
                  <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    {this.state.formvalue}Add product
                  </button>
                </form>
              </div>
            </div>
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
