import React, {useState, useEffect} from "react";
import { getUserCart } from "../api";
import { useNavigate } from 'react-router-dom'
import {default as CartItem} from './CartItem'

const Cart = ({user, token}) => {
  const [cart, setCart] = useState([]);
  const [cost, setCost] = useState(0)

  const navigate = useNavigate()
  const cartItems = async () => {
    const response = await getUserCart(token);
    if (response) {
      setCart(response.cart)
      setCost(response.totalCost)
    }
    return response;
  }
  
  const handleCheckout = () => {
    navigate('/checkout')
  }
  useEffect(() => {
    cartItems();
  },[token])


  return (
    <div>
      <h1 className='ui center aligned header cart-header'>Cart</h1>
      {cart ? cart.map((eachCard) => 
    <CartItem cartItems={cartItems} token={token} eachCard={eachCard} /> ) 
      : null}
      <div className="container checkout">
        <h4>Your total cart cost: ${cost}</h4>
        {cart.length ? <button className="ui button"
          onClick={() => {
          handleCheckout();
          }}>
            Go to Checkout
        </button>: null}
      </div>
    </div>
  );
};

export default Cart;
