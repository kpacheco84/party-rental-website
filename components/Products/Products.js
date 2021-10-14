import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Popconfirm, message } from 'antd'
import Amplify from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { Products as apiProducts } from '../../src/models'
import awsmobile from '../../src/aws-exports'

import ProductForm from './ProductForm'
import Navbar from '../Navbar'

Amplify.configure(awsmobile)

const Products = (props) => {
  const [products, setProducts] = useState([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [action, setAction] = useState('Add')

  const getData = async () => {
    const data = await DataStore.query(apiProducts)
    console.log('this is the products data', data)
    setProducts(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleEdit = (id) => {
    const selected = products.find((item) => item.id === id)

    setSelectedProduct(selected)
    setAction('Edit')
    setShowProductForm(true)
  }

  const handleDelete = async (id) => {
    console.log(' this is the product to delete', id)

    const todelete = await DataStore.query(apiProducts, id)
    DataStore.delete(todelete)

    getData()
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Short Desc.',
      dataIndex: 'shortDesc',
      key: 'shortDesc',
    },
    {
      title: 'Long Desc.',
      dataIndex: 'longDesc',
      key: 'longDesc',
    },
    {
      title: 'Length',
      dataIndex: 'length',
      key: 'length',
    },
    {
      title: 'Width',
      dataIndex: 'width',
      key: 'width',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },

    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },

    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Action',
      key: 'action',
      sorter: true,
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            placement="topRight"
            title="Are you sure you want to delete this product? this will affect any orders they have. 
        It is always best to
        make it inactive"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
          <a
            className="ant-dropdown-link"
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Navbar />
      <h1>Admin - All Products Table </h1>
      <button onClick={() => setShowProductForm(true)}>Add New</button>
      <Table
        pagination={false}
        columns={columns}
        dataSource={products}
        rowKey={(record) => record.id}
      />
      <ProductForm
        showProductForm={showProductForm}
        setShowProductForm={setShowProductForm}
        getData={getData}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        action={action}
      />
    </div>
  )
}

export default Products
