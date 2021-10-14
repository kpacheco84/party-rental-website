import React, { useContext } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'

import { useItems, useItemsUpdate } from '../components/Cart'
import Navbar from '../components/Navbar'
import MyCart from '../components/Checkout/MyCart'
import ScheduleDelivery from '../components/Checkout/ScheduleDelivery'

const Cart = (props) => {
  const items = useItems()
  const updateItems = useItemsUpdate()
  // const items = useCart()
  // const dispatch = useDispatchCart()
  //const totalPrice = items.reduce((total, b) => total + b.price, 0)

  //console.log('this is the items in the cart page', items)
  return (
    <div>
      <Navbar />
      <div className="mycart">
        <div className="cart-heading">
          <div>
            <h1>My Cart </h1>
          </div>
          <div>
            <button className="shop-btn">
              <Link href="/productsearch">
                <h2>
                  <AiOutlineArrowLeft /> Continue Shopping
                </h2>
              </Link>
            </button>
          </div>
        </div>
        <div className="mycart-content">
          <div className="mycart-content-left">
            <label>These is the count of items {items.length}</label>
            <label>
              {' '}
              This is the total amount{' '}
              {items.map((n) => n.amount * n.qty).reduce((a, b) => a + b, 0)}
            </label>
            <MyCart />
          </div>
          <div className="mycart-content-right">
            <ScheduleDelivery />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
