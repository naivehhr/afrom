import React from 'react';
import Item, { IWidghtProps } from './Item';

const Custom = (props: IWidghtProps) => {
  const T = props.component;
  return (
    <Item {...props}>
      <T {...props} />
    </Item>
  );
};
export default React.memo(Custom, (nextProps, prevProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
