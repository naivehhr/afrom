import React from 'react'
import { Select } from 'antd'
import Item, { IWidghtProps } from './Item'
const { Option } = Select

const WidgetSelect = (props: IWidghtProps) => {
  const { value, onChange, widgetOptions = {} } = props
  const handleChange = (value: any) => {
    onChange(value)
  }
  const { selects = [], style } = widgetOptions
  return (
    <Item {...props}>
      <Select value={value} onChange={handleChange} style={style}>
        {selects.map((item: any) => {
          const { text, value } = item
          return <Option key={value}>{text}</Option>
        })}
      </Select>
    </Item>
  )
}
export default React.memo(WidgetSelect, (nextProps, prevProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
})
