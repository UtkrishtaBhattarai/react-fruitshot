import React from "react";
import axios from "axios";
import NavBarComponent from "../usernavigation/NavbarComponent";
import SimpleReactValidator from "simple-react-validator";
import Swal from 'sweetalert2';

class OrderStatusComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: ""
    };
    this.validator = new SimpleReactValidator();
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    if (this.state.id == "") {
      alert("Enter Product id");
      return;
    }
    e.preventDefault();
    axios
      .get("http://localhost:4000/order/orderget/" + this.state.id)
      .then(response => {
        console.log(response);
        const ans = response.data.status;
        if (ans == "Successfully Dispatched") {
            Swal.fire({
                title: 'Already Dispatched!',
                text: 'You Product is ready for dispatch',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
          return;
        } else if (ans == "no") {
            Swal.fire({
                title: 'Not Dispatched!',
                text: 'You Product is still pending',
                icon: 'warning',
                confirmButtonText: 'Okay'
              })
          return;
        } else {
            Swal.fire({
                title: 'Check Order ID!',
                text: 'The order ID is incorrect',
                icon: 'error',
                confirmButtonText: 'Okay'
              })
          return;
        }
      })
      .catch();
  };

  render() {
    return (
        <div className="container-fluid">
            <NavBarComponent/>
        <div class=" col-sm-12">
        <form class="form-style-9">
<ul>
<li>

<h4 className="text-center">Please enter your order number</h4>
<input
  type="text" 
  name="id" style={{width:"100%", background:"aliceblue", color:"darkyellow", fontSize:"40px"}}
  value={this.state.id}
  autoFocus
  onChange={this.handleChange}
/>
                     {this.validator.message(
                    "ID",
                    this.state.id,
                    "required"
                  )}
                  </li>
                  </ul>
                  <input type="submit" className="btn btn-success" value="Submit" onClick={this.handleClick} style={{width:"100%"}} />
                  </form>
                  </div>
                  
                  </div>
                  
    );
  }
}

export default OrderStatusComponent;