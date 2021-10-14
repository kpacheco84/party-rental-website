import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import { Modal, Form, Input, Button, Radio } from 'antd'

import logo from '../../public/logo.svg'

import { useItems, useItemsUpdate } from '../Cart'

const CheckoutForm = ({ success }) => {
  const items = useItems()
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const onFinish = async (values) => {
    console.log('You clicked on finish here are the values', values)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (!error) {
      const { id } = paymentMethod
      let amount =
        items.map((n) => n.amount * n.qty).reduce((a, b) => a + b, 0) * 100

      try {
        const { data } = await axios.post('/api/charge', {
          id,
          amount: amount,
          items,
        })
        console.log(data)
        success()
        router.push('/checkoutsuccess')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Form className="checkout-form" onFinish={onFinish} layout="vertical">
      <img src={logo} style={{ maxWidth: '50px' }} />
      <Form.Item
        name={['user', 'nameoncard']}
        label="Name On Card:"
        rules={[{}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email:"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        ${items.map((n) => n.amount * n.qty).reduce((a, b) => a + b, 0)}
      </button>
    </Form>
  )
}

// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const StripeCheckout = (props) => {
  const [status, setStatus] = React.useState('ready')

  if (status === 'success') {
    return <div>Congrats on your Bounce House!</div>
  }

  return (
    <Modal
      visible={props.showCheckoutForm}
      footer={null}
      onCancel={props.handleModalClose}
      closable
    >
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
