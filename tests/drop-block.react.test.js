import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DropBlock } from '../lib/drop-block.tsx';

configure({ adapter: new Adapter() });

test('DropBlock renders', () => {
  const props = { children: 'test', connectDropTarget: f => f };
  const Component = mount(<DropBlock {...props} />);
});

test('connectDropTarget is executet and within the render function`s return', () => {
  const props = { children: 'test', connectDropTarget: f => 'executed' };
  const Component = mount(<DropBlock {...props} />);
  expect(Component.text()).toEqual('executed');
});
