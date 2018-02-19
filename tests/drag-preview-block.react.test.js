import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DragPreviewBlock } from '../lib/drag-preview-block.tsx';

configure({ adapter: new Adapter() });

test('DragPreviewBlock renders', () => {
  const props = { connectDragSource: f => f, renderBlock: (f, g) => 'test' };
  const Component = mount(<DragPreviewBlock {...props} />);
});

test('DragPreviewBlock executes it`s passed functions as expected', () => {
  const props = { connectDragSource: f => (f === 1 ? 'success' : 'failure'), renderBlock: (f, g) => 1 };
  const Component = mount(<DragPreviewBlock {...props} />);
  expect(Component.text()).toEqual('success');
});

test('DragPreviewBlock executes the renderPreview method on mount', () => {
  let testedValue = false;
  const props = {
    connectDragSource: f => f,
    renderBlock: (f, g) => 'test',
    renderPreview: (f, g) => {
      testedValue = true;
    },
  };
  const Component = mount(<DragPreviewBlock {...props} />);
  expect(testedValue).toEqual(true);
});
