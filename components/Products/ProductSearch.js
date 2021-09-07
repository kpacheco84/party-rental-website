import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { Row, Col, Card } from 'antd'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'

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
  },
]

const ProductSearch = (props) => {
  const [loading, setLoading] = useState(true)
  const [newData, setNewData] = useState(data)

  const updateProductQty = (id, action) => {
    console.log(id, action)

    let product = newData.filter((data) => data.id === id)

    if (action === 'subtract' && product[0].incart !== 0) {
      let updatedAmt = product[0].incart - 1
      console.log(product, updatedAmt)

      let newDataQty = newData.map((element) =>
        element.id === id ? { ...element, incart: updatedAmt } : element,
      )
      setNewData(newDataQty)
    } else {
      let updatedAmt = product[0].incart + 1
      console.log(product, updatedAmt)

      let newDataQty = newData.map((element) =>
        element.id === id ? { ...element, incart: updatedAmt } : element,
      )
      setNewData(newDataQty)
    }
  }

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
                      onClick={() => updateProductQty(data.id, 'subtract')}
                      disabled={data.incart === 0 ? true : false}
                    >
                      -
                    </button>
                    {data.incart}
                    <button
                      onClick={() => updateProductQty(data.id, 'add')}
                      disabled={data.incart === data.qty ? true : false}
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
