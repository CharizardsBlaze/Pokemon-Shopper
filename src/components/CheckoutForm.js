import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { checkout } from '../api'
const CheckoutForm = ({token, cart}) => {
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA"
        , "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI"
        , "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
    const [totalCost, setTotalCost] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('AL')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const stripe = useStripe()
    const elements = useElements()
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
                return_url: 'http://localhost:3000/cards',
            },
            redirect: 'if_required'
        })
        if(result.error){
            alert(result.error.message)
        }else{
            alert('Your payment was successful!')
            cart.totalCost = totalCost;
            await checkout({cart, address, state, city, zip, token})
            setAddress('')
            setCity('')
            setState('')
            setZip('')
            navigate('/orders')
        }
    }
      useEffect(() => {
        setTotalCost((cart.totalCost * 1.08 + 4.99).toFixed(2))
      },[cart])
    return (
        <div id='checkout-page'>
        <div className='checkout-form'>
            <form id='shipping-form'>
                <h4>Shipping address</h4>
                <label className=''>Full name</label>
                <input className='text-input' type='text' placeholder='First and Last name'></input>
                <label>Address</label>
                <input className='text-input' type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Street address'></input>
                <div id='shipping-city'>
                <div className='shipping-block'><label>City</label>
                <input className='text-input' type='text' value={city} onChange={(e) => setCity(e.target.value)}></input></div>
                <div className='shipping-block'><label>State</label>
                <select className='select-quality' value={state} onChange={(e) => setState(e.target.value)}>{states.map((state, index) => {
                    return <option key={index} value={state}>{state}</option>
                })}</select></div>
                <div className='shipping-block'><label>Zip Code</label>
                <input className='text-input' type='text' value={zip} onChange={(e) => setZip(Number(e.target.value))}></input></div>
                </div>
            </form>
            <h4>Order Summary</h4>
            <p>Items: ${cart.totalCost}</p>
            <p>Shipping: $4.99</p>
            <p>Estimated Tax: ${(cart.totalCost * 0.08).toFixed(2)}</p>
            <p>Total: ${totalCost}</p>
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
