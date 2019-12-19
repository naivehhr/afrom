import React from 'react';
import { Input } from 'antd';
import Item, { IWidghtProps } from './Item';

const WidgetInput = (props: IWidghtProps) => {
  const { value, idPath, onChange, className, placeholder, customerEvent } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };
  return (
    <Item {...props}>
      <Input
        id={idPath}
        className={className}
        placeholder={placeholder}
        value={value || ''}
        onChange={handleChange}
        onBlur={customerEvent}
      />
    </Item>
  );
};
export default React.memo(WidgetInput, (nextProps, prevProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
