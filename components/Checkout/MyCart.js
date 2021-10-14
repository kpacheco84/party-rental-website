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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },

    ,
  ]

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
