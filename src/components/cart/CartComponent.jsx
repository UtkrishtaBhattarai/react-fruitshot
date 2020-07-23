import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import './cart.scss'
import NavBarComponent from '../usernavigation/NavbarComponent';

class CartComponent extends React.Component {
    state = {
        cart: []
    }

    componentDidMount() {
        axios.get('http://localhost:4000/cart/check/' + localStorage.getItem('userid'))
            .then((response) => {
                console.log(response.data)
                this.setState({
                    cart: response.data

                })
            })
    }

    deletecart = (productid) => {
        var x = confirm("Are you sure you want to delete from cart?");//eslint-disable-line
        if (x) {

            axios.delete("http://localhost:4000/cart/deletecart/" + productid);
            location.reload();//eslint-disable-line
        }
        else {
            return false;
        }

    }
    render() {
        if (localStorage.getItem("userid") == null) {
            return <Redirect to='/login' />
        }
        const mydata = this.state.cart.map(cart => {
            return (
               
                <div class="card" style={{marginLeft:"50px", marginRight:"10px",marginTop:"20px"}}>
                   
  <img src={`http://localhost:4000/uploads/${cart.image}`} alt="Denim Jeans" style={{width:"100%",height:"200px"}}/>
  <h1>{cart.name}</h1>
  <p class="price">Rs {cart.price} /-</p>
  <p><NavLink to='/'>View same product!</NavLink></p>
  <p><button onClick={() => this.deletecart(cart._id)}>Delete Cart</button></p>
  
  <NavLink to={`/order/${cart.productid}`}>
  <p><button className="btn btn-success" style={{background:"green", marginTop:"5px"}}>Checkout</button></p>
                                </NavLink>
</div>

            )
        })
        return (
            <React.Fragment>
            <NavBarComponent></NavBarComponent>
            <div className="container-fluid">
                <h3 className="alert alert-success text-center">Cart Items</h3>
                <div className="row">
                    {mydata}
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default CartComponent;