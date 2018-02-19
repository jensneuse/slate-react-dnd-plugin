import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Container } from '../lib/container.tsx';

configure({ adapter: new Adapter() });

test('Container renders', () => {
  const props = { children: 'test' };
  const Component = mount(<Container {...props} />);
});

test("Container renders it's given children", () => {
  const props = {
    children: (
      <div className={'firstClass'}>
        <span className={'secondClass'}>test1</span>
        <span className={'thirdClass'}>test2</span>
      </div>
    ),
  };
  const Component = mount(<Container {...props} />);
  expect(Component.text()).toEqual('test1test2');
  expect(Component.find('.firstClass').length).toBeTruthy();
  expect(Component.find('.secondClass').length).toBeTruthy();
  expect(Component.find('.thirdClass').length).toBeTruthy();
});

test('Container.getChildContext returns a object containing a getEditor and setEditor method', () => {
  const props = { children: <div>testchild</div> };
  const Component = mount(<Container {...props} />);
  const childContextTypes = Component.get(0).type.childContextTypes;
  expect(childContextTypes).toHaveProperty('getEditor');
  expect(typeof childContextTypes.getEditor).toEqual('function');
  expect(childContextTypes).toHaveProperty('setEditor');
  expect(typeof childContextTypes.setEditor).toEqual('function');
});
//can not call functions to test them, unfortunately
