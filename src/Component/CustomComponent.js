import React, { Component } from "react"
import { Rate } from "antd"

export default class CustomComponent extends Component {
  componentDidMount() {
    const { onSubmitValidate } = this.props
    onSubmitValidate(() => {
      const { value } = this.props
      if (!value || value < 3) {
        return "不得低于3分"
      }
    })
  }

  // 自定组件的错误处理是放到这里面更合适些吧
  handleChange = value => {
    const { onChange, onError } = this.props
    onChange(value)
    // onError('实时 我错误了');
  }
  // handleChange(value) {
  //   const { onChange, onError } = this.props
  //   onChange(value)
  // }
  // collectWrong
  render() {
    return <Rate onChange={this.handleChange} valfue={this.props.value} />
  }
}
