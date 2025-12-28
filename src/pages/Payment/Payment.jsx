import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentFrom from './PaymentForm'

const stripePromise = loadStripe(import.meta.env.VITE_payment_key)

function Payment() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentFrom></PaymentFrom>
        </Elements>
    )
}

export default Payment