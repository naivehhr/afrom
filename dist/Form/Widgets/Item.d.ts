import { ReactNode } from 'react';
export interface IWidghtProps {
    idPath: string;
    label: string;
    value: any;
    error?: any;
    validate?: any;
    placeholder?: string;
    className?: string;
    component?: any;
    children?: ReactNode;
    componentConfig?: any;
    onChange: (ids: string) => (value: any) => void;
    customerEvent: () => void;
}
declare const ItemWrap: ({ label, error, validate: { required }, children }: IWidghtProps) => JSX.Element;
export default ItemWrap;
