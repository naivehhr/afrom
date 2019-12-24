import { ReactNode } from "react";
export interface IFormSchema {
    type: string;
    label: string;
    properties: IFormSchema;
    placeholder?: string;
    widget?: string;
    validate?: {};
    isHidden?: boolean;
    customerEvent?: any;
}
export interface IOnChange {
    value: any;
    idPath: string;
    formError: {};
    formData: {};
}
export interface IOnSubmit {
    formData: {};
    formError?: {};
}
export interface IFormProps {
    formSchema: {};
    formData?: {};
    formError?: {};
    onChange?: (params: IOnChange) => void;
    onSubmit: (params: IOnSubmit) => void;
    onBlur?: any;
}
export interface IFieldsOptions {
    idPath: string;
    layout: string;
    widgetComponent?: ReactNode;
}
export interface IAssemblyWidget {
    schema: any;
    idPath?: string;
    data?: any;
    error?: any;
}
export interface IFormState {
    props: {};
    schema: {};
    data?: {};
    error?: {};
}
export interface IWIdget {
    [key: string]: any;
}
