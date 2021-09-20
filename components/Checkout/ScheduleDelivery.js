import React, { useState, useEffect } from 'react'
import { Form, Modal } from 'antd'
import Link from 'next/link'

import Checkout from './StripeCheckout'
import StripeCheckout from './StripeCheckout'

const data = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 AM']
const ScheduleDelivery = (props) => {
  const [dropoffTime, setDropoffTime] = useState(null)
  const [pickupTime, setPickupTime] = useState(null)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)

  const dropoff = []

  const pickup = []

  const handleCheckout = () => {
    setShowCheckoutForm(true)
  }

  return (
    <div className="sched-delivery">
      <div className="sched-delivery-left">
        <h1>OrderDetail</h1>
        <h3>Event/Delivery Address:</h3>
        <h2>Schedule Delivery</h2>{' '}
        <p>
          * We will do our best to deliver at the exact time specified but hours
          my vary within that 2 hour window. We will contact you when we are on
          the way.
        </p>
        <h3>Choose a Drop Off Time:</h3>
        <div className="time">
          <ul>
            {data.map((data) => (
              <li>
                <button>{data}</button>
              </li>
            ))}
          </ul>
        </div>
        <h3>Choose a Pick-Up Time:</h3>
        <div className="time">
          <ul>
            {data.map((data) => (
              <li>
                <button>{data}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sched-delivery-right">
        <button onClick={() => handleCheckout()} role="link">
          Checkout
        </button>
      </div>
      <StripeCheckout
        showCheckoutForm={showCheckoutForm}
        setShowCheckoutForm={setShowCheckoutForm}
      />
    </div>
  )
}

export default ScheduleDelivery
