import React, { ReactNode } from 'react';
import { Form } from 'antd';
import styles from './index.css';

const Item = Form.Item;
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

const ItemWrap = ({ label, error = '', validate: { required } = {}, children }: IWidghtProps) => {
  return (
    <Item
      label={label}
      required={required}
      validateStatus={error && 'error'}
      help={error}
      className={styles.formItemWrap}
    >
      {children}
    </Item>
  );
};
export default ItemWrap;
