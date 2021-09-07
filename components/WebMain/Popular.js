import React from 'react'
import { Row, Col, Card, CardImg } from 'antd'

const { Meta } = Card

const data = [
  {
    id: '1',
    name: 'Bounce Package A',
    img: '',
    products: [
      { id: 1, productid: 1, subcategory: 'Small Bounce House', qty: 1 },
      { id: 2, productid: 3, subcategory: 'Concession', qty: 1 },
      { id: 3, productid: 3, subcategory: 'Tables', qty: 5 },
      { id: 4, productid: 4, subcategory: 'Chairs', qty: 20 },
    ],
  },

  {
    id: '2',
    name: 'Bounce Package B',
    img: '',
    products: [
      { id: 1, productid: 1, subcategory: 'Medium Bounce House', qty: 1 },
      { id: 2, productid: 3, subcategory: 'Concession', qty: 1 },
      { id: 3, productid: 3, subcategory: 'Tables', qty: 6 },
      { id: 4, productid: 4, subcategory: 'Chairs', qty: 25 },
    ],
  },
  {
    id: '3',
    name: 'Bounce Package C',
    img: '',
    products: [
      { id: 1, productid: 1, subcategory: 'Large Bounce House', qty: 1 },
      { id: 2, productid: 3, subcategory: 'Concession', qty: 2 },
      { id: 3, productid: 3, subcategory: 'Tables', qty: 7 },
      { id: 4, productid: 4, subcategory: 'Chairs', qty: 30 },
    ],
  },
]

{
  /*<div style={{ textAlign: 'center', justifyContent: 'center' }}>
              <p>{card.products.subcategory}</p>
              <ul>
                {card.products.map((products) => (
                  <li>{products.qty + 'X ' + products.subcategory}</li>
                ))}
              </ul>
                </div>*/
}

const Popular = (props) => {
  return (
    <div className="popular">
      <h1>Popular</h1>
      <div className="site-card-wrapper">
        <Row wrap={true} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {data.map((data) => (
            <Col
              flex="auto"
              className="gutter-row"
              className="card-section-col"
            >
              <div className="card-section">
                <Card
                  className="popular-cards"
                  title={data.name}
                  style={{ width: 400 }}

                  /*actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}*/
                >
                  <div>
                    <ul>
                      {data.products.map((products) => (
                        <li>
                          {products.qty} <b>x</b> {products.subcategory}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div>
        <h3>see more</h3>
      </div>
    </div>
  )
}

export default Popular
