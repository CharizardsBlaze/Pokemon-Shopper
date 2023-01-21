import React  from 'react'
import { removeFromCart, editQuantityOnCart } from "../api";

const CartItem = ({eachCard, token, cartItems}) => {

  
  
  const handleRemoveFromCart = async(cardId) => {
    // cartId and token
    const response = await removeFromCart({cart_id: cardId, token: token});
    if (response.error) {
      return;
    } else {
      cartItems(token);
    }
    return response;
  }
  const handleQuantity = async(quantity) => {
    const response = await editQuantityOnCart({token: token, cart_id:eachCard.id, quantity: quantity})
    if (response.error) {
      !alert(response.message)
    }else {
      cartItems(token)
    }
  }
      return (
          <div key={eachCard.product_id + eachCard.id} className="container cart-container">
            <img src={eachCard.imageUrl} className="cart-image"/>
            <div className="container info-container">
              <p className="cart-name">Card name: {eachCard.name}</p>
              
              <input min='1' type='number' onChange={(event) => {handleQuantity(event.target.value)}} value={eachCard.quantity}></input>
             
              <p className="cart-cost">Cost: {eachCard.itemCost}</p>
              <p>Rarity: {eachCard.rarity}</p>
              <button className="ui button"
                onClick={() => handleRemoveFromCart(eachCard.id, token)}>
                  Remove {eachCard.name} from cart
              </button>
            </div>

          </div>
        )
}

export default CartItem