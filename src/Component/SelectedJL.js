import * as React from "react"

import { Cascader } from "antd"

const App = props => {
  const { onSubmitValidate, value } = props
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake"
            }
          ]
        }
      ]
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men"
            }
          ]
        }
      ]
    }
  ]

  function onChange(value) {
    props.onChange(value)
  }

  // Just show the latest item.
  function displayRender(label) {
    return label[label.length - 1]
  }

  onSubmitValidate(() => {
    if (!value || value.length === 0) {
      return "Cascader error"
    }
  })

  return (
    <Cascader
      options={options}
      expandTrigger="hover"
      displayRender={displayRender}
      onChange={onChange}
    />
  )
}

export default App
