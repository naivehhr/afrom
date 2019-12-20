import * as React from "react"
import CustomComponent from "./Component/CustomComponent"
import SelectedJL from "./Component/SelectedJL"

import Form from "./Form/Form"
// import Form from "../dist/Form/"
// import Form from "../lib/index"


// 打包出来均需要单独引用 并且在loader中配置 |lib|dist
// import "../lib/index.css"
// import "../dist/Form/index.css"


export interface IAppProps {}
class App extends React.Component<IAppProps> {
  state = {
    formError: {},
    formData: {name:1, range:3,select:["zhejiang","hangzhou"]},
    formSchema: {
      // name1: {
      //   type: "string",
      //   label: "插件名称",
      //   placeholder: "请填写插件名称",
      //   validate: { maxLen: 3, required: true },
      //   // layout: 'horizontal',
      // },
      name: {
        type: "string",
        label: "插件名称",
        placeholder: "请填写插件名称",
        validate: { maxLen: 3, required: true },
        layout: 'horizontal',
      },
      select: {
        type: "component",
        label: "选择",
        component: SelectedJL,
        layout: 'horizontal',
      },
      range: {
        type: "component",
        label: "评分",
        component: CustomComponent,
        validate: { required: true },
        layout: 'horizontal',
      }
    }
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({formData: {
  //       name: 'woqu'
  //     }})
  //   }, 2000);
  // }
  
  onChange = () => {}
  handleSubmit = () => {}
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
