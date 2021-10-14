import React from 'react'

import { useItems, useItemsUpdate } from '../Cart'

const CheckoutSuccess = (props) => {
  const items = useItems()
  const updateItems = useItemsUpdate()

  return (
    <div>
      <h1> The order is successful</h1>
      <h2>Order Details</h2>
    </div>
  )
}

export default CheckoutSuccess
