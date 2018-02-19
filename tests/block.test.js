import { getIndex, dragSource, changing, dragTarget } from '../lib/block.tsx';

test('getIndex is returning -1 when val is non-truthy', () => {
  expect(getIndex([], false)).toEqual(-1);
});

test('getIndex is returning -1 when nodes is not an array', () => {
  expect(getIndex({}, 1)).toEqual(-1);
});

test('getIndex is returning the index of the node with it`s key === val', () => {
  const nodes = [{ key: 1 }, { key: 3 }, { key: 5 }, { key: 7 }];
  expect(getIndex(nodes, 7)).toEqual(3);
  expect(getIndex(nodes, 5)).toEqual(2);
  expect(getIndex(nodes, 3)).toEqual(1);
  expect(getIndex(nodes, 1)).toEqual(0);
});

test('getIndex does not crash on edge cases', () => {
  const nodes = [, [], true, false, 6, { key: 7 }];
  expect(getIndex(nodes, 7)).toEqual(5);
});

test('dragSource has beginDrag, endDrag and canDrag keys, which are all functions', () => {
  expect(dragSource).toHaveProperty('beginDrag');
  expect(typeof dragSource.beginDrag).toEqual('function');
  expect(dragSource).toHaveProperty('endDrag');
  expect(typeof dragSource.endDrag).toEqual('function');
  expect(dragSource).toHaveProperty('canDrag');
  expect(typeof dragSource.canDrag).toEqual('function');
});

test("dragSource.beginDrag and dragSource.endDrag return the children.key value of it's given props parameter as the key value within a new object", () => {
  const props = { children: { key: '123' } };
  expect(dragSource.beginDrag(props)).toEqual({ key: '123' });
  expect(dragSource.endDrag(props)).toEqual({ key: '123' });
});

test('dragSource.canDrag evaluates when to enable dragging as expected', () => {
  const dynProps = template => {
    return {
      children: {
        type: {
          PLUGIN_DEFAULT_TEMPLATE: template,
        },
      },
    };
  };
  expect(dragSource.canDrag(dynProps({ draggable: true, removable: true }))).toEqual(true);
  expect(dragSource.canDrag(dynProps({ draggable: false, removable: true }))).toEqual(false);
  expect(dragSource.canDrag(dynProps({ draggable: false, removable: false }))).toEqual(false);
  expect(dragSource.canDrag(dynProps({}))).toEqual(true);
  expect(dragSource.canDrag(dynProps({ draggable: false }))).toEqual(false);
  expect(dragSource.canDrag(dynProps({ removable: false }))).toEqual(false);
});

test('changing is set to false', () => {
  expect(changing).toEqual(false);
});

test('dragTarget contains the hover method', () => {
  expect(dragTarget).toHaveProperty('hover');
});
