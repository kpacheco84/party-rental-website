import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'

const CheckoutForm = ({ success }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (!error) {
      const { id } = paymentMethod

      try {
        const { data } = await axios.post('/api/charge', { id, amount: 1099 })
        console.log(data)
        success()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <h2>Price: $10.99 USD</h2>

      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}

// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const Checkout = () => {
  const [status, setStatus] = React.useState('ready')

  if (status === 'success') {
    return <div>Congrats on your empanadas!</div>
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        success={() => {
          setStatus('success')
        }}
      />
    </Elements>
  )
}

export default Checkout
