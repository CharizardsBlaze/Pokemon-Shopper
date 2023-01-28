import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CheckoutForm } from "./index"
import { paymentInitialize, getUserCart } from '../api';
import { useEffect, useState } from  'react'
const stripePromise = loadStripe('pk_test_51MRQaELdzpxpOBV5lHyw2XNDvy08nNRm89pF7xTER9xZ19RF3JmTn2hSbS8dSmfPmriA3ghJn39pphGwaOFUGeSw00rZ5EB0XM');
const items = {
    stuff: 4
}
const Stripe = ({token}) => {
    const [clientSecret, setClientSecret] = useState(null)
    const [cart, setCart] = useState({})
    const cartItems = async () => {
        const userCart = await getUserCart(token);
        setCart(userCart)
      }
      useEffect(() => {
        cartItems();
      },[])
    useEffect
    useEffect(() => {
        if(Object.keys(cart).length){
        paymentInitialize(cart).then(res=> setClientSecret(res.clientSecret))
        }
    }, [cart])
        if(!clientSecret){
            return <div>Loading</div>
        }
    return (
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm token={token} cart={cart} setCart={setCart}/>
        </Elements>
    )
}
export default Stripe
