import React from 'react';
import Item, { IWidghtProps } from './Item';

const Display = (props: IWidghtProps) => {
  const { value } = props;
  return (
    <Item {...props}>
      <div>{value}</div>
    </Item>
  );
};
export default React.memo(Display, (nextProps, prevProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
