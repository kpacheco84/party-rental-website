import React from 'react'
import { Select } from 'antd'
import { DatePicker, Space } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

const { Option } = Select

function onBlur() {
  console.log('blur')
}

function onFocus() {
  console.log('focus')
}

function onSearch(val) {
  console.log('search:', val)
}

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1])
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
}
const data = [
  { id: 1, name: 'Tents' },
  { id: 2, name: 'Chairs' },
  { id: 3, name: 'Tables' },
  { id: 4, name: 'Bounce Houses' },
  { id: 5, name: 'Slides' },
  { id: 6, name: 'Concessions' },
  { id: 7, name: 'Packages' },
]

const SearchBar = (props) => {
  return (
    <div className="searchbar">
      <div className="inputs">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a Category"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value={0}>ALL</Option>
          {data.map((data) => (
            <Option value={data.id}>{data.name}</Option>
          ))}
        </Select>
      </div>
      <div>
        <Space direction="vertical" size={12}>
          <RangePicker
            ranges={{
              Today: [moment(), moment()],
              'This Month': [
                moment().startOf('month'),
                moment().endOf('month'),
              ],
            }}
            onChange={onChange}
          />
        </Space>
      </div>
    </div>
  )
}

export default SearchBar
