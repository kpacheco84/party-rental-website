import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import { Modal } from 'antd'

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
      <img
        src="https://images.ricardocuisine.com/services/recipes/500x675_7700.jpg"
        style={{ maxWidth: '50px' }}
      />
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

const StripeCheckout = (props) => {
  const [status, setStatus] = React.useState('ready')

  if (status === 'success') {
    return <div>Congrats on your empanadas!</div>
  }

  return (
    <Modal visible={props.showCheckoutForm}>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          success={() => {
            setStatus('success')
          }}
        />
      </Elements>
    </Modal>
  )
}

export default StripeCheckout
