import React, { useState } from 'react'
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
import moment from 'moment'

import logo from '../../public/logo.svg'

import { DataStore } from '@aws-amplify/datastore'
import {
  Orders as apiOrders,
  OrderDetail as apiOrderDetail,
  Payments as apiPayments,
} from '../../src/models'

import { useItems, useItemsUpdate } from '../Cart'

const CheckoutForm = ({ success }) => {
  const [orderID, setOrderID] = useState(null)
  const [orderNum, setOrderNum] = useState(null)
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

        // call payment api

        //call order api
        //try to figure out how topass the transaction id to payment api
        saveOrder(amount)

        //order detail api
        router.push('/checkoutsuccess')
      } catch (error) {
        console.log(error)
      }
    }
  }

  //DATASTORE API

  //save order
  const saveOrder = async (amount) => {
    //get next order number

    // insert order info
    try {
      const newOrder = await DataStore.save(
        new apiOrders({
          orderNumber: 'CP0001',
          orderDate: moment().format('YYYY-MM-DD'),
          thruDate: '2021-01-01',
          fromDate: '2021-01-03',
          address_line1: '15511 sw 152 terr',
          address_line2: 'Apt 32',
          eventName: 'Correa Wedding',
          state: 'FL',
          zip: 33187,
          city: 'Miami',
          customerNotes: 'Please go through the back',
          secondaryContact: 'Carol',
          eventtypID: 'a3f4095e-39de-43d2-baf4-f8c16f0f6f4d',
        }),
      )
      //get back the order number to pass to the rest of your api

      //get back orderID
      setOrderID(newOrder.id)
      console.log('new order id', newOrder.id)

      // call payments api
      savePayment(newOrder.id, amount)

      //call save order detail api
      saveOrderDetail(newOrder.id)
    } catch (err) {
      console.log('error on insert of data', err)
    }
  } // end of order api

  // datastore payment api
  const savePayment = async (orderid, amount) => {
    try {
      await DataStore.save(
        new apiPayments({
          transID: 'argeargergtest',
          amount: amount * 0.01,
          type: 'PMT',
          ordersID: orderid,
        }),
      )
    } catch (err) {
      console.log('error on insert of payment', err)
    }
  } // end of save payment api

  //order detail api
  const saveOrderDetail = async (orderid) => {
    try {
      let i = 0
      //loop through each item to save
      for (i; i < items.length; i++) {
        await DataStore.save(
          new apiOrderDetail({
            ordersID: orderid,
            productsID: items[i].id,
            qty: items[i].qty,
            amount: items[i].amount,
          }),
        )
      } //end of loop
    } catch (err) {
      console.log('error on insert of order detail', err)
    }
  } // end of save order detail

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
