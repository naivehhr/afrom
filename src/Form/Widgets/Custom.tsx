import React from 'react';
import Item, { IWidghtProps } from './Item';

const Custom = (props: IWidghtProps) => {
  const {component, ...rest} = props
  const T = component;
  return (
    <Item {...rest}>
      <T {...rest} />
    </Item>
  );
};
export default React.memo(Custom, (nextProps, prevProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
