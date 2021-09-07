import React from 'react'
import { Row, Col, Card, CardImg } from 'antd'

const { Meta } = Card

const data = [
  {
    id: '1',
    name: 'Consessions',
    img: '/offer_icon_1.svg',
    description: `Food  and snack solutions.
    From  hot dog stand, 
    cotton candy machine,
    ice shaving machine,  
    industrial BBQ and more`,
  },

  {
    id: '2',
    name: 'Bounce Houses',
    img: '/offer_icon_2.svg',
    description: `We have all types of bounce houses. Bounce houses 
    of all sizes and shapes. If you want them simple we have them, 
    if you want them with a slide and basketball hoop we have that too!`,
  },
  {
    id: '3',
    name: 'Tents and Seating',
    img: '/offer_icon_3.svg',
    description: `No worries about seating. 
We have tents of all zises, chairs, tables and 
more for your decorating needs.`,
  },
]

const WhatWeOffer = (props) => {
  return (
    <div className="offer">
      <h1>What We Offer</h1>
      <div className="site-card-wrapper">
        <Row gutter={50}>
          {data.map((data) => (
            <Col span={8}>
              <Card
                className="offer-cards"
                style={{ width: 280 }}
                /* actions={[<img className="more_plus" src="/more_plus.svg" />]}*/
              >
                <img src={data.img} />
                <Meta title={data.name} description={data.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default WhatWeOffer
