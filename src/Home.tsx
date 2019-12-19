import * as React from "react"
// import Form from "./Form/Form"
// import Form from "../dist/schemaform"
import Form from "../lib/index"
import CustomComponent from "./Component/CustomComponent"
import SelectedJL from "./Component/SelectedJL"

export interface IAppProps {}
class App extends React.Component<IAppProps> {
  state = {
    formError: {},
    formData: {},
    formSchema: {
      name: {
        type: "string",
        label: "插件名称",
        placeholder: "请填写插件名称",
        validate: { maxLen: 3, required: true }
      },
      select: {
        type: "component",
        label: "选择",
        component: CustomComponent
      },
      range: {
        type: "component",
        label: "评分",
        component: SelectedJL,
        validate: { required: true }
      }
    }
  }
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
