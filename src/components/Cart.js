import React, {useState, useEffect} from "react";
import { getUserCart } from "../api";

const Cart = ({user, token}) => {

  const [cart, setCart] = useState({});
  const [cost, setCost] = useState(0)

  const cartItems = async (token) => {
    const response = await getUserCart(token);
    console.log(response, 'response in getCart');
    if (response) {
      setCart(response.cart)
      setCost(response.totalCost)
    }
    return response;
  }

  useEffect(() => {
    cartItems(token);
  },[])

  return (
    <div>
      <h1 className='ui center aligned header'>Cart</h1>
      {cart.map((eachCard) => {
        return (
          <div>
          {eachCard.name}
          {eachCard.itemCost}
          {eachCard.rarity}
          </div>
        )
      })}
      <p>Your total cart cost: ${cost}</p>
    </div>
  );
};

export default Cart;
