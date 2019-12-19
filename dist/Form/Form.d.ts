import React from "react";
import { IFormProps, IFormState } from "./interface";
export default class Form extends React.Component<IFormProps, IFormState> {
    static getDerivedStateFromProps(props: IFormProps, state: IFormState): any;
    formValidates: {
        idPath: string;
        validate: object;
        label: string;
        type: string;
    }[];
    subInstance: any;
    constructor(props: IFormProps);
    eventDispatch: () => void;
    handleChange: (params: any) => (value: any) => void;
    handleError: ({ idPath }: any) => (errors: []) => void;
    handleSubmit: () => void;
    validateForm: () => boolean;
    assemblyForm: () => any[];
    render(): JSX.Element;
}
