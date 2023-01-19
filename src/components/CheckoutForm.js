import {PaymentElement} from '@stripe/react-stripe-js'
import {useNavigate} from 'react-router-dom'
const CheckoutForm = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/cart')
    }
    return (
        <form>
            <PaymentElement />
            <button onClick={handleBack}>Back</button>
            <button>Submit</button> 
        </form>
    )
}
export default CheckoutForm