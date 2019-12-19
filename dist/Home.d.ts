import * as React from "react";
import CustomComponent from "./Component/CustomComponent";
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
                    maxLen: number;
                    required: boolean;
                };
            };
            select: {
                type: string;
                label: string;
                component: typeof CustomComponent;
            };
            range: {
                type: string;
                label: string;
                component: (props: any) => JSX.Element;
                validate: {
                    required: boolean;
                };
            };
        };
    };
    onChange: () => void;
    handleSubmit: () => void;
    render(): JSX.Element;
}
export default App;
