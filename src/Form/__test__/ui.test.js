import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Form from '../Form';

// it('renders Form', () => {
//   const tree = renderer
//     .create(
//       <Form
//         formSchema={{
//           name: {
//             type: 'string',
//             label: '插件名称',
//             placeholder: '请填写插件名称',
//             validate: { maxLen: 3, required: true },
//           },
//         }}
//       />,
//     )
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });

describe('Enzyme Shallow', function() {
  it("App's title should be Todos", function() {
    shallow(
      <Form
        formSchema={{
          name: {
            type: 'string',
            label: '插件名称',
            placeholder: '请填写插件名称',
            validate: { maxLen: 3, required: true },
          },
        }}
      />,
    );
  });
});
