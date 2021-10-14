import React, { useState, useEffect, useContext } from 'react'
import { Menu, Badge, Popover } from 'antd'
import Link from 'next/link'
import { useItems, useItemsUpdate } from './Cart'
import { BsPersonFill } from 'react-icons/bs'

//import { useCart } from './Cart'

const { SubMenu } = Menu

const Navbar = (props) => {
  const authenticated = 'false'
  const authGroup = 'Customer'

  const [current, setCurrent] = useState('')
  //const items = useCart()
  const items = useItems()
  const updateItems = useItemsUpdate()

  const links = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contactus' },
  ]

  const authlinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Products', path: '/products' },
    { name: 'Orders', path: '/orders' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Contacts', path: '/contacts' },
  ]

  const handleClick = (e) => {
    console.log('this is the key', e)
  }

  const content = (
    <div className="cart-items">
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
    </div>
  )

  return (
    <div id="navbar" className="navbar">
      <div className="logo-section">
        <img src="/logo.svg" />
      </div>

      <div className="nav-btns">
        {authenticated === true && authGroup === 'Admin' ? (
          <ul>
            {authlinks.map((links) => (
              <a>
                <li>{links.name}</li>
              </a>
            ))}
          </ul>
        ) : (
          <ul>
            {links.map((links) => (
              <a>
                <li>{links.name}</li>
              </a>
            ))}
          </ul>
        )}
        {/*<button className="btns btn-pink">Sign-Up</button>*/}
        {!authenticated ? (
          <button className="btns btn-lightblue">Login</button>
        ) : (
          ''
        )}
      </div>

      {!authenticated || authGroup !== 'Admin' ? (
        <div className="cart-section">
          <Popover placement="bottomRight" content={content}>
            <Link href="/cart">
              <Badge
                className="cart-badge"
                style={{
                  marginTop: '.9rem',
                  marginRight: '1rem',
                  backgroundColor: '#05dfd7',
                  color: 'black',
                }}
                count={items === undefined ? 0 : items.length}
              >
                <img
                  className="cart"
                  src="/cart.svg"
                  onClick={() => console.log('cart being clicked')}
                />
              </Badge>
            </Link>
          </Popover>
        </div>
      ) : (
        ''
      )}

      {authenticated === true ? (
        <div>
          <BsPersonFill className="nav-auth-person" />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Navbar
