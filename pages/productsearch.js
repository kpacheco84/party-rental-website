/*this will be the page you are taken to when searching for a product*/

import React from 'react'
import Navbar from '../components/Navbar'
import ProductSearch from '../components/Products/ProductSearch'
import Footer from '../components/Footer'

const productsearch = (props) => {
  return (
    <div>
      <Navbar />
      <ProductSearch />
      <Footer />
    </div>
  )
}

export default productsearch
