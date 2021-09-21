import React from 'react'

import CheckoutSuccess from '../components/Checkout/CheckoutSuccess'
import Navbar from '.././components/Navbar'

const checkoutsuccess = (props) => {
  return (
    <div>
      <Navbar />
      <h1>Checkout Success Page</h1>
      <CheckoutSuccess />
    </div>
  )
}

export default checkoutsuccess
