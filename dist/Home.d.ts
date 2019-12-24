import * as React from "react";
import { IOnChange, IOnSubmit } from "./Form/interface";
export interface IAppProps {
}
declare class App extends React.Component<IAppProps> {
    state: {
        formError: {};
        formData: {};
        formSchema: {
            name: {
                type: string;
                label: string;
                placeholder: string;
                validate: {
                    required: boolean;
                };
            };
            age: {
                type: string;
                label: string;
                placeholder: string;
                validate: {
                    maxLen: number;
                    required: boolean;
                };
            };
        };
    };
    onChange: (params: IOnChange) => void;
    handleSubmit: (params: IOnSubmit) => void;
    render(): JSX.Element;
}
export default App;
