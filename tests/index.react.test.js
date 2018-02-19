import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DnDProvider } from '../lib/index.tsx';

configure({ adapter: new Adapter() });

const DnDProviderOptions = {
  context: { setEditor: f => f },
};

test('DnDProvider renders', () => {
  const props = { children: 'test' };
  const Component = mount(<DnDProvider {...props} />, DnDProviderOptions);
});

test('DnDProvider renders it`s given child as expected', () => {
  const props = {
    children: (
      <div className={'firstClass'}>
        <span className={'secondClass'}>test1</span>
        <span className={'thirdClass'}>test2</span>
      </div>
    ),
  };
  const Component = mount(<DnDProvider {...props} />, DnDProviderOptions);
  expect(Component.find('.firstClass').length).toBeTruthy();
  expect(Component.find('.secondClass').length).toBeTruthy();
  expect(Component.find('.thirdClass').length).toBeTruthy();
  expect(Component.text()).toEqual('test1test2');
});

test('DnDProvider executes it`s passed context.setEditor function on mount', () => {
  const props = { children: <div className="testChild">test</div> };
  const options = { context: { setEditor: () => (testedValue = 'touched') } };
  let testedValue = 'untouched';
  const Component = mount(<DnDProvider {...props} />, options);
  expect(testedValue).toEqual('touched');
});
