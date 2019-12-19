import React from "react"
import { Radio } from "antd"
import { RadioChangeEvent } from "antd/lib/radio"
import Item, { IWidghtProps } from "./Item"

const WidgetRadio = (props: IWidghtProps) => {
  const { value, idPath, onChange, componentConfig } = props
  const { data, setting } = componentConfig
  if (Object.prototype.toString.call(data) !== "[object Object]") {
    throw new Error(`${idPath} data config error`)
  }
  // const data1: { [key: string]: any } = antdConfig.data;
  const handleChange = (event: RadioChangeEvent) => {
    const {
      target: { value }
    } = event
    onChange(value)
  }
  console.log("setting", setting)
  return (
    <Item {...props}>
      <Radio.Group onChange={handleChange} value={value}>
        {Object.keys(data).map((item: any) => {
          return (
            <Radio key={item} value={item}>
              {data[item]}
            </Radio>
          )
        })}
      </Radio.Group>
    </Item>
  )
}
export default React.memo(WidgetRadio, (nextProps, prevProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
})
