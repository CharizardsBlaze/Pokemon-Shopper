import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUserCart } from '../api'
const CheckoutForm = ({token}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/cart')
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!stripe || !elements){
            return
        }
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/cards'
            }
        })
        if(result.error){
            console.log(result.error.message)
        }else{
            console.log('payment went through')
        }
    }
    const cartItems = async () => {
        const userCart = await getUserCart(token);
        setCart(userCart)
      }
      useEffect(() => {
        cartItems();
      },[])
    return (
        <div id='checkout-page'>
        <div className='checkout-form'>
            <form id='shipping-form'>
                <h4>Shipping address</h4>
                <label className=''>Full name</label>
                <input className='text-input' type='text' placeholder='First and Last name'></input>
                <label>Address</label>
                <input className='text-input' type='text' placeholder='Street address'></input>
                <div id='shipping-city'>
                <div className='shipping-block'><label>City</label>
                <input className='text-input' type='text'></input></div>
                <div className='shipping-block'><label>State</label>
                <select className='select-quality'></select></div>
                <div className='shipping-block'><label>Zip Code</label>
                <input className='text-input' type='text'></input></div>
                </div>
            </form>
            <h4>Order Summary</h4>
            <p>Items: ${cart.totalCost}</p>
            <p>Shipping: $4.99</p>
            <p>Estimated Tax: ${(cart.totalCost * 0.07).toFixed(2)}</p>
            <p>Total: ${(cart.totalCost * 1.07 + 4.99).toFixed(2)}</p>
        </div>
        <div className='checkout-form'>
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button className='checkout-button' onClick={handleBack}>Back</button><br></br>
            <button className='checkout-button' disabled={!stripe}>Submit</button> 
        </form>
        </div></div>
    )
}
export default CheckoutForm
