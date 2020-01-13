import React from "react"
import { Input, Icon } from "antd"
import Item, { IWidghtProps } from "./Item"

const WidgetInput = (props: IWidghtProps) => {
  const {
    value,
    idPath,
    onChange,
    className,
    placeholder,
    customerEvent,
    widgetOptions = {}
  } = props
  const { prefix, ...rest } = widgetOptions
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    onChange(value)
  }
  const prefixComponent = prefix ? <Icon type="smile" /> : null
  return (
    <Item {...props}>
      <Input
        id={idPath}
        className={className}
        placeholder={placeholder}
        value={value || ""}
        onChange={handleChange}
        onBlur={customerEvent}
        prefix={prefixComponent}
        {...rest}
      />
    </Item>
  )
}
export default React.memo(WidgetInput, (nextProps, prevProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
})
