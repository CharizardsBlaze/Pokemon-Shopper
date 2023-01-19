import React, {useState, useEffect} from "react";
import { getUserCart } from "../api";
import { removeFromCart } from "../api";
import { useNavigate } from 'react-router-dom'

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

  useEffect(() => {
    cartItems();
  },[token])

  const handleRemoveFromCart = async(cardId) => {
    console.log('are you sure you want to delete this from the cart?')
    // cartId and token
    const response = await removeFromCart({cart_id: cardId, token: token});
    if (response.error) {
      return;
    } else {
      cartItems(token);
    }
    return response;
  }

  const handleCheckout = () => {
    console.log('you have checked out!')
    navigate('/checkout')
  }

  return (
    <div>
      <h1 className='ui center aligned header'>Cart</h1>
      {cart ? cart.map((eachCard) => {
        return (
          <div key={eachCard.product_id + eachCard.id} className="container cart-container">
            <img src={eachCard.imageUrl} className="cart-image"/>
            <div className="container info-container">
              <p className="cart-name">Card name: {eachCard.name}</p>
              <p className="cart-cost">Cost: {eachCard.itemCost}</p>
              <p>Rarity: {eachCard.rarity}</p>
              <button className="ui button"
                onClick={() => handleRemoveFromCart(eachCard.id, token)}>
                  Remove {eachCard.name} from cart
              </button>
            </div>

          </div>
        )
      }) : null }
      <div className="container checkout">
        <h4>Your total cart cost: ${cost}</h4>
        <button className="ui button"
          onClick={() => {
          handleCheckout();
          }}>
            Go to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
