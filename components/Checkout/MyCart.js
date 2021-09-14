import React, { useEffect } from 'react'
import { Table, Tag, Space } from 'antd'

import { useItems, useItemsUpdate } from '../Cart'

const MyCart = (props) => {
  const items = useItems()
  const updateItems = useItemsUpdate()

  useEffect(() => {
    return () => {
      items
    }
  }, [items])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Qty',
      dataIndex: 'incart',
      key: 'incart',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    /*,
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },*/
    ,
  ]

  /*
  const data = [
    {
      key: items.id,
      name: 'John Brown',
      incart: 32,
      price: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      incart: 32,
      price: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '3',
      name: 'Joe Black',
      incart: 32,
      price: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
  ]
*/

  console.log('this is items in MyCart', items)
  return (
    <div>
      {!items ? (
        <h2>Your Cart is empty</h2>
      ) : (
        <Table pagination={false} columns={columns} dataSource={items} />
      )}
    </div>
  )
}

export default MyCart
