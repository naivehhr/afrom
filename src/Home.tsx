import * as React from "react"
// import CustomComponent from "./Component/CustomComponent"
// import SelectedJL from "./Component/SelectedJL"

import Form from "./Form/Form"
import { IOnChange, IOnSubmit } from "./Form/interface"
// import Form from "../dist/Form/"
// import Form from "../lib/index"

// 打包出来均需要单独引用 并且在loader中配置 |lib|dist
// import "../lib/index.css"
// import "../dist/Form/index.css"

export interface IAppProps {}
class App extends React.Component<IAppProps> {
  state = {
    formError: {},
    formData: { },
    formSchema: {
      name: {
        type: "string",
        label: "名称",
        placeholder: "请填写插件名称",
        widgetOptions: {
          prefix: "smile"
        },
        validate: { required: true }
        // layout: "horizontal"
      },
      age: {
        type: "string",
        label: "年龄",
        placeholder: "请填写插件名称",
        validate: { maxLen: 3, required: true }
        // layout: 'horizontal',
      }
      // select: {
      //   type: "component",
      //   label: "选择",
      //   component: SelectedJL,
      //   layout: "horizontal"
      // },
      // range: {
      //   type: "component",
      //   label: "评分",
      //   component: CustomComponent,
      //   validate: { required: true },
      //   layout: "horizontal"
      // }
    }
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({formData: {
  //       name: 'woqu'
  //     }})
  //   }, 2000);
  // }

  onChange = (params: IOnChange) => {
    // const { value, idPath, formError, formData } = params
    console.log("params", params)
  }
  handleSubmit = (params: IOnSubmit) => {
    // const { formError, formData } = params
    console.log("handleSubmit", params)
  }
  public render() {
    const { formSchema, formData, formError } = this.state

    return (
      <Form
        formSchema={formSchema}
        formData={formData}
        formError={formError}
        onChange={this.onChange}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default App
