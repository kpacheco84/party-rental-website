import React, { useState, useEffect, useContext } from 'react'
import SearchBar from './SearchBar'
import { Row, Col, Card } from 'antd'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import Amplify from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { Products as apiProducts } from '../../src/models'
import awsmobile from '../../src/aws-exports'

import { useItems, useItemsUpdate } from '../Cart'

Amplify.configure(awsmobile)

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
    price: 125,
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
    price: 55,
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
]

const ProductSearch = (props) => {
  const [loading, setLoading] = useState(true)
  const [newData, setNewData] = useState(data)
  const [products, setProducts] = useState([])
  //const dispatch = useDispatchCart()
  const items = useItems()
  const { updateItems } = useItemsUpdate()

  const updateQty = (id, action) => {
    console.log('im in your updateQty')
    updateItems(id, action)
  }

  const getData = async () => {
    const data = await DataStore.query(apiProducts)
    console.log('this is the products data in product search', data)
    setProducts(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="productsearch">
      <SearchBar />

      <div className="products">
        <div>
          <Row gutter={80} style={{ rowGap: '40px' }}>
            {products.map((data) => (
              <Col key={data.id}>
                <Card
                  id={data.id}
                  className="product-cards"
                  style={{ width: 365 }}
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
                    <p>
                      {' '}
                      <b>Demensions:</b> {data.height} X {data.width} X{' '}
                      {data.length}
                    </p>
                    <p>{data.shortDesc}</p>
                    <p>
                      Price: <b>${data.amount}</b>
                    </p>
                  </div>
                  <div className="add-to-cart">
                    <button
                      onClick={() => updateQty(data.id, 'remove')}
                      //disabled={data.incart === 0 ? true : false}
                    >
                      -
                    </button>
                    {items.find((item) => item.id === data.id)
                      ? items.find((item) => item.id === data.id).incart
                      : 0}

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
