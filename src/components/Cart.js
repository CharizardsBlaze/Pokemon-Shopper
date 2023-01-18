import React, {useState, useEffect} from "react";
import { getUserCart } from "../api";
import { removeFromCart } from "../api";

const Cart = ({user, token}) => {

  console.log('user in Cart', user)
  console.log('user in Cart', user)

  const [cart, setCart] = useState([]);
  const [cost, setCost] = useState(0)

  const cartItems = async (token) => {
    const response = await getUserCart(token);
    console.log('response in getCart', response);
    if (response) {
      setCart(response.cart)
      setCost(response.totalCost)
    }
    return response;
  }

  useEffect(() => {
    cartItems(token);
  },[])

  const handleRemoveFromCart = async(cardId, token) => {
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
  }

  return (
    <div>
      <h1 className='ui center aligned header'>Cart</h1>
      {cart ? cart.map((eachCard) => {
        return (
          <div key={eachCard.product_id + eachCard.id} className="container">
            <img src={eachCard.imageUrl} />
            <p>{eachCard.name}</p>
            <p>{eachCard.itemCost}</p>
            <p>{eachCard.rarity}</p>
            <button 
              onClick={() => handleRemoveFromCart(eachCard.id, token)}>
                Remove {eachCard.name} from cart
            </button>
          </div>
        )
      }) : null }
      <h4>Your total cart cost: ${cost}</h4>
      <button 
        onClick={() => {
        handleCheckout();
        }}>
          Checkout
      </button>
    </div>
  );
};

export default Cart;
