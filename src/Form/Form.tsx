import React from "react"
import { Button } from "antd"
import { IWidghtProps } from "./Widgets/Item"
import {
  IAssemblyWidget,
  IFieldsOptions,
  IFormProps,
  IFormState
} from "./interface"
import {
  cleanObj,
  get,
  set,
  merge,
  isEmpty,
  cloneDeep,
  validateFields
} from "./utils"
import Subscribe from "./Subscribe"
import { parsingLayout } from "./logic"
import { WIDGET_TYPE } from "./constant"
import styles from "./index.css"

export default class Form extends React.Component<IFormProps, IFormState> {
  static getDerivedStateFromProps(props: IFormProps, state: IFormState) {
    const { formSchema, formData = {}, formError = {} } = props
    return merge(state, {
      data: formData,
      error: formError,
      schema: formSchema
    })
  }
  formValidates: {
    idPath: string
    validate: object
    label: string
    type: string
  }[] = []
  subInstance: any
  constructor(props: IFormProps) {
    super(props)
    this.state = {
      schema: props.formSchema,
      data: props.formData || {},
      error: props.formError || {}
    }
    this.formValidates = [] // 收集 schema 中配置的校验
    this.subInstance = new Subscribe()
  }

  eventDispatch = () => {}

  handleChange = (params: any) => (value: any) => {
    const { error, data } = this.state
    const { onChange } = this.props
    const { idPath, validate, label, type } = params
    const fieldsVal = validateFields({ label, value, validate, type }) || ""
    const newError = { ...error }
    const newData = { ...data }
    set(newError, idPath, fieldsVal.toString())
    set(newData, idPath, value)
    this.setState({ data: newData, error: cleanObj(newError) }, () => {
      const { error, data } = this.state
      onChange &&
        onChange({
          formError: cloneDeep(error),
          formData: cloneDeep(data),
          idPath,
          value
        })
    })
  }

  handleError = ({ idPath }: any) => (errors: []) => {
    const { error } = this.state
    set(error, idPath, errors)
    this.setState({ error })
  }

  handleSubmit = () => {
    const { error, data } = this.state
    const { onSubmit } = this.props
    // 收集不到自定义组件内部的自定义错误执行，重要
    // console.log(data);
    // console.log(error);
    if (this.validateForm()) {
      console.log("校验通过")
      onSubmit && onSubmit(error, cleanObj(data))
    }
  }

  validateForm = (): boolean => {
    const { data, error } = this.state
    let validateResult = { ...error }
    const customError = this.subInstance.dispatchEventAll()
    customError.forEach((item: any) => {
      Object.keys(item).forEach(idPath => {
        set(validateResult, idPath, item[idPath])
      })
    })

    for (const item of this.formValidates) {
      const { idPath, validate, label, type } = item
      const value = get(data, idPath)
      const fieldsVal =
        validate && validateFields({ label, value, type, validate })
      if (fieldsVal) {
        set(validateResult, idPath, fieldsVal.toString()) // toString 暂时是为了处理多个错误的情况
      }
    }
    validateResult = cleanObj(validateResult)
    this.setState({ error: validateResult })
    return isEmpty(validateResult)
  }

  assemblyForm = () => {
    const { schema, data, error } = this.state
    const fieldsList: Array<IFieldsOptions> = []
    const assemblyWidget = ({
      idPath = "",
      schema,
      data = "",
      error = ""
    }: IAssemblyWidget) => {
      const {
        label,
        type,
        properties,
        validate,
        component,
        title,
        prefix,
        layout,
        ...rest
      } = schema
      const fieldsOptions: IFieldsOptions = {
        idPath,
        layout // 'horizontal' | 'vertical'
      }
      if (type === "object") {
        if (!properties) {
          throw new Error(`${idPath} is necessary parameters properties!`)
        }
        if (!prefix && !title) {
          throw new Error(`form need a prefix or title`)
        }
        let formName = prefix || title
        Object.keys(properties).forEach(key => {
          const itemSchema = properties[key]
          const nIdPath = idPath
            ? `${idPath}.${formName}.${key}`
            : `${formName}.${key}`
          assemblyWidget({
            schema: itemSchema,
            idPath: nIdPath,
            data: get(data, `${formName}.${key}`),
            error: get(error, `${formName}.${key}`)
          })
        })
        return
      }
      if (!type) {
        Object.keys(schema).forEach(key => {
          const itemSchema = get(schema, key)
          const nIdPath = idPath ? `${idPath}.${key}` : key
          assemblyWidget({
            schema: itemSchema,
            idPath: nIdPath,
            data: data[key],
            error: error[key]
          })
        })
        return
      }
      const widgetProps: IWidghtProps = {
        error,
        label,
        idPath,
        type,
        validate,
        value: data,
        onChange: this.handleChange({ idPath, validate, label, type }),
        onError: this.handleError({ idPath }), // onChange 实时回调
        onSubmitValidate: component && this.subInstance.subscribe(idPath), // onSubmit 时统一收集自定义组件的错误信息
        component,
        ...rest
      }
      if (type === "component" && !component) {
        throw new Error("need component config")
      }
      const T = WIDGET_TYPE[type]
      fieldsOptions.widgetComponent = <T {...widgetProps} />
      fieldsList.push(fieldsOptions)
      this.formValidates = [
        ...this.formValidates,
        { idPath, validate, label, type }
      ]
    }
    assemblyWidget({ schema, data, error })
    return parsingLayout(fieldsList)
  }

  render() {
    const { schema, data, error } = this.state
    if (isEmpty(schema)) {
      return <div>need schema config</div>
    }
    return (
      <div style={{ minWidth: 500 }}>
        <div className={styles.form}>{this.assemblyForm()}</div>
        <div style={{ maxWidth: 500 }}>
          <div>data => {JSON.stringify(data)}</div>
          <div>error => {JSON.stringify(error)}</div>
        </div>
        <div className={styles.btnGroup}>
          <Button onClick={this.handleSubmit}>提交</Button>
        </div>
      </div>
    )
  }
}
