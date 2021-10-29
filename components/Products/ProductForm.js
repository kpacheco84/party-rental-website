import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Modal,
  Row,
  Col,
  Upload,
} from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import Amplify, { API } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { Products as apiProducts } from '../../src/models'
import awsmobile from '../../src/aws-exports'
Amplify.configure(awsmobile)

const ProductForm = (props) => {
  const [form] = Form.useForm()

  /*api add*/

  const createProduct = async (values) => {
    try {
      const newProduct = await DataStore.save(new apiProducts(values))
      console.log('this is the newcust', newProduct)

      alert('Successfully added product')
      props.getData()
      props.setShowProductForm(false)
      // set selectedProduct back to []

      props.setSelectedProduct([])
    } catch (e) {
      alert('here is an error', e)
    }
  }

  /* api edit */

  const updateProduct = async (values) => {
    // original product
    const original = await DataStore.query(
      apiProducts,
      props.selectedProduct.id,
    )

    console.log('here is the original', original)
    console.log('these are the values passed', values.id, values)

    try {
      await DataStore.save(
        apiProducts.copyOf(original, (updated) => {
          updated.name = values.name
          updated.shortDesc = values.shortDesc
          updated.longDesc = values.longDesc
          updated.length = values.length
          updated.width = values.width
          updated.height = values.height
          updated.size = values.size
          updated.qty = values.qty
          updated.active = values.active
          //firstname= values.firstname,
          updated.amount = values.amount
        }),
      )

      alert('Successfully updated product')

      props.getData()
      props.setShowProductForm(false)
      props.setSelectedProduct([])
    } catch (e) {
      alert('here is an error', e)
    }
  }

  //on form submission

  const onFinish = (values) => {
    if (props.action === 'Add') {
      createProduct(values)
    } else {
      updateProduct(values)
    }
  }

  /* set fields */

  /*
  const setFields = () => {
    form.setFieldsValue({
      name: props.setSelectedProduct.name,
      shortDesc: props.setSelectedProduct.shortDesc,
      longDesc: props.setSelectedProduct.longDesc,
      length: props.setSelectedProduct.length,
      width: props.setSelectedProduct.width,
      height: props.setSelectedProduct.height,
      size: props.setSelectedProduct.size,
      qty: props.setSelectedProduct.qty,
      active: props.setSelectedProduct.active,
      //firstname= values.firstname,
      amount: props.setSelectedProduct.amount,
    })
  }

  */

  useEffect(() => {
    form.setFieldsValue({
      name: props.selectedProduct.name,
      shortDesc: props.selectedProduct.shortDesc,
      longDesc: props.selectedProduct.longDesc,
      length: props.selectedProduct.length,
      width: props.selectedProduct.width,
      height: props.selectedProduct.height,
      size: props.selectedProduct.size,
      qty: props.selectedProduct.qty,
      active: props.selectedProduct.active,
      //firstname= values.firstname,
      amount: props.selectedProduct.amount,
    })
  }, [props.selectedProduct])

  //fileupload
  const normFile = (e) => {
    console.log('Upload event:', e)

    if (Array.isArray(e)) {
      return e
    }

    return e && e.fileList
  }

  const uploadImg = () => {
    console.log('uploaded a file')
  }

  return (
    <div>
      <Modal
        forceRender
        visible={props.showProductForm}
        width={800}
        title={'Product - ' + props.action}
        closable
        onCancel={() => props.setShowProductForm(false)}
        getContainer={false}
      >
        <Form layout="horizontal" onFinish={onFinish} form={form}>
          <Form.Item label="Active" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action={() => uploadImg()} listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="medium">Medium</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Short Description" name="shortDesc">
            <Input />
          </Form.Item>
          <Form.Item label="Long Description" name="longDesc">
            <Input />
          </Form.Item>
          <Row>
            <Form.Item label="Length" name="length">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Width" name="width">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Height" name="height">
              <InputNumber />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item label="Quantity" name="qty">
              <InputNumber />
            </Form.Item>

            <Form.Item label="Amount" name="amount">
              <InputNumber />
            </Form.Item>
          </Row>
          <div>
            <Form.Item label="Button">
              <Button htmlType="submit">
                {props.action === 'Edit' ? 'Update' : 'Add'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default ProductForm
