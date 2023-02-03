import React  from 'react'
import { removeFromCart, editQuantityOnCart } from "../api";

const CartItem = ({eachCard, token, cartItems}) => {

  const handleRemoveFromCart = async(cardId) => {
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
          <div className="card-cart-container">
            <div className='imageContainer'>
              <img src={eachCard.imageUrl} className="cart-image"/>
            </div>
          <div className='maininfo'>
            <div className="info-container">
              <p className="cart-name">Card name: {eachCard.name}</p>
              <span>Quantity:</span>
              <input min='1' type='number' onChange={(event) => {handleQuantity(event.target.value)}} value={eachCard.quantity}></input>
            </div>
  
            <div className='costContainer'>
              <p className="cart-cost">Cost: <span className='cardcost'>${eachCard.itemCost}</span></p>
              <button className="ui button"
                onClick={() => handleRemoveFromCart(eachCard.id, token)}>
                  Remove {eachCard.name} from cart
              </button>
            </div>
            </div>
            
          </div>
          
        )
}

export default CartItem