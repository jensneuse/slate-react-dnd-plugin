import { DragPreviewBlockSource } from '../lib/drag-preview-block.tsx';

test('DragPreviewBlockSource contains a beginDrag and endDrag method', () => {
  expect(DragPreviewBlockSource).toHaveProperty('beginDrag');
  expect(typeof DragPreviewBlockSource.beginDrag).toEqual('function');
  expect(DragPreviewBlockSource).toHaveProperty('endDrag');
  expect(typeof DragPreviewBlockSource.beginDrag).toEqual('function');
});

test('DragPreviewBlockSource.beginDrag returns the passed props.onHover value within an object', () => {
  const props = { onHover: 'test' };
  expect(DragPreviewBlockSource.beginDrag(props)).toEqual({ onHover: props.onHover });
});

test('DragPreviewBlockSource.endDrag returns the passed props.children.key value within an object', () => {
  const props = { children: { key: 'test' } };
  expect(DragPreviewBlockSource.endDrag(props)).toEqual({ key: props.children.key });
});
