import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Block } from '../lib/block.tsx';

configure({ adapter: new Adapter() });

test('Block renders what is returned by it`s passed renderBlock prop', () => {
  const props = {
    renderBlock: (f, g) => 'test',
    connectDropTarget: f => f,
    connectDragSource: f => f,
  };
  const Component = mount(<Block {...props} />);
  expect(Component.text()).toEqual('test');
});

test('Block executes it`s through the props passed renderBlock, connectDropTarget and connectDragSource functions in this order', () => {
  const props = {
    renderBlock: (f, g) => 1,
    connectDropTarget: f => f === 1,
    connectDragSource: f => (f === true ? 'success' : 'failure'),
  };
  const Component = mount(<Block {...props} />);
  expect(Component.text()).toEqual('success');
});
