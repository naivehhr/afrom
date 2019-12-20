import * as React from "react";
import CustomComponent from "./Component/CustomComponent";
import "../dist/Form/index.css";
export interface IAppProps {
}
declare class App extends React.Component<IAppProps> {
    state: {
        formError: {};
        formData: {
            name: number;
            range: number;
            select: string[];
        };
        formSchema: {
            name: {
                type: string;
                label: string;
                placeholder: string;
                validate: {
                    maxLen: number;
                    required: boolean;
                };
                layout: string;
            };
            select: {
                type: string;
                label: string;
                component: (props: any) => JSX.Element;
                layout: string;
            };
            range: {
                type: string;
                label: string;
                component: typeof CustomComponent;
                validate: {
                    required: boolean;
                };
                layout: string;
            };
        };
    };
    onChange: () => void;
    handleSubmit: () => void;
    render(): JSX.Element;
}
export default App;
