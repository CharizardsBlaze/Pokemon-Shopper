import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CheckoutForm } from "./index"
import { paymentInitialize } from '../api';
import { useEffect, useState } from  'react'
const stripePromise = loadStripe('pk_test_51MRQaELdzpxpOBV5lHyw2XNDvy08nNRm89pF7xTER9xZ19RF3JmTn2hSbS8dSmfPmriA3ghJn39pphGwaOFUGeSw00rZ5EB0XM');
const items = {
    stuff: 4
}
const Stripe = () => {
    // const func = async () => {
    //     return await paymentInitialize(items)
    // }
    const [clientSecret, setClientSecret] = useState(null)
    useEffect(() => {
        paymentInitialize(items).then(res=> setClientSecret(res.clientSecret))
    }, [])
        if(!clientSecret){
            return <div>Loading</div>
        }
    return (
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm />
        </Elements>
    )
}
export default Stripe