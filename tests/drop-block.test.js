import { target } from '../lib/drop-block.tsx';

test('target contains a hover, drop and canDrop method', () => {
  expect(target).toHaveProperty('hover');
  expect(typeof target.hover).toEqual('function');
  expect(target).toHaveProperty('drop');
  expect(typeof target.drop).toEqual('function');
  expect(target).toHaveProperty('canDrop');
  expect(typeof target.canDrop).toEqual('function');
});

test('target.canDrop executes it`s passed props.canDrop function as expected', () => {
  const monitor = 'B';
  const props = { canDrop: (props, monitor) => 'A' + monitor };
  expect(target.canDrop(props, monitor)).toEqual('AB');
});

test('target.hover returns undefined when it`s passed props.onHover is not truthy', () => {
  const props = {};
  expect(target.hover(props)).toEqual(undefined);
});

test('target.hover executes it`s passed props.onHover function and returns a value when props.onHover is truthy', () => {
  const props = {
    onHover: (f, g, h) => 'A' + g + h,
  };
  const monitor = 'B';
  const component = 'C';
  expect(target.hover(props, monitor, component)).toEqual('ABC');
});
