import React, { useState, useEffect, useContext } from 'react'
import SearchBar from './SearchBar'
import { Row, Col, Card } from 'antd'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'

import { useItems, useItemsUpdate } from '../Cart'

const { Meta } = Card

const data = [
  {
    id: 1,
    name: 'Bounce House A',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 2,
    increment: 1,
    price: 25,
  },
  {
    id: 2,
    name: 'Bounce House B',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 5,

    increment: 1,
    price: 50,
  },
  {
    id: 3,
    name: 'Bounce House C',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 5,
    increment: 1,
    price: 100,
  },
  {
    id: 4,
    name: 'Bounce House D',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 4,
    increment: 1,
    price: 35,
  },
  {
    id: 5,
    name: 'Bounce House E',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 20,
    increment: 1,
    price: 25,
  },
  {
    id: 6,
    name: 'Bounce House F',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 2,
    increment: 1,
    price: 60,
  },
]

const ProductSearch = (props) => {
  const [loading, setLoading] = useState(true)
  const [newData, setNewData] = useState(data)
  //const dispatch = useDispatchCart()
  const items = useItems()
  const updateItems = useItemsUpdate()

  const updateQty = (id, action) => {
    console.log('im in your updateQty')
    updateItems(id, action)
  }
  /*
  const updateProductQty = (id, action) => {
    let product = newData.filter((data) => data.id === id)

    if (action === 'remove' && product[0].incart !== 0) {
      let updatedAmt = product[0].incart - 1
      console.log(product, updatedAmt)

      let newDataQty = newData.map((element) =>
        element.id === id ? { ...element, incart: updatedAmt } : element,
      )

      //dispatch({ product, type: 'remove' })
      setNewData(newDataQty)
    } else {
      let updatedAmt = product[0].incart + 1

      let newDataQty = newData.map((element) =>
        element.id === id ? { ...element, incart: updatedAmt } : element,
      )
      console.log(product, newDataQty)
      //dispatch({ product, type: 'add' })
      //setName('Bob')

      
      updateItems()

      setNewData(newDataQty)
    }
  }
  */

  return (
    <div className="productsearch">
      <SearchBar />
      <div className="products">
        <div>
          <Row gutter={80} style={{ rowGap: '40px' }}>
            {newData.map((data) => (
              <Col>
                <Card
                  key={data.id}
                  id={data.id}
                  className="product-cards"
                  style={{ width: 325 }}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  /* actions={[<img className="more_plus" src="/more_plus.svg" />]}*/
                >
                  <Meta title={data.name} description={data.shortdesc} />
                  <div className="products-info">
                    <b>Demensions:</b> {data.height} X {data.width} X{' '}
                    {data.length}
                  </div>
                  <div className="add-to-cart">
                    <button
                      onClick={() => updateQty(data.id, 'remove')}
                      //disabled={data.incart === 0 ? true : false}
                    >
                      -
                    </button>
                    {data.incart}
                    {/* {items.filter((item) => item.id === data.id)
                      ? items.filter((item) => item.id === data.id).incart
                   : 0}*/}
                    <button
                      onClick={() => updateQty(data.id, 'add')}
                      //disabled={data.incart === data.qty ? true : false}
                    >
                      +
                    </button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default ProductSearch
