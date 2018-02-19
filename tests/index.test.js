import { inject, ReactDnDPlugin } from '../lib/index.tsx';

test('inject() return an Array', () => {
  const plugins = [{}, {}, {}];
  const result = inject(plugins, {});
  expect(Array.isArray(result)).toBeTruthy();
});

test('inject appends the plugin.renderNode value to the options.renderNodeFunctions key', () => {
  const plugins = [{ renderNode: 'a' }, { renderNode: 'b' }, { renderNode: 'c' }];
  const options = {};
  const result = inject(plugins, options);
  expect(options).toHaveProperty('renderNodeFunctions');
  expect(options.renderNodeFunctions.length).toEqual(3);
  expect(options.renderNodeFunctions).toEqual(['a', 'b', 'c']);
});

test('if the options already contain renderNodeFunctions, the plugin.renderNode values are appended after the existing one', () => {
  const plugins = [{ renderNode: 'a' }, { renderNode: 'b' }, { renderNode: 'c' }];
  const options = { renderNodeFunctions: ['z'] };
  const result = inject(plugins, options);
  expect(options).toHaveProperty('renderNodeFunctions');
  expect(options.renderNodeFunctions.length).toEqual(4);
  expect(options.renderNodeFunctions).toEqual(['z', 'a', 'b', 'c']);
});

test("in case the injected plugins contain plugins themselves, the options.renderNodeFunctions adds the parent's renderNode key for each one once more", () => {
  const plugins = [{ plugins: [{ renderNode: 'a' }, { renderNode: 'b' }, { renderNode: 'c' }], renderNode: 'z' }];
  const options = {};
  const result = inject(plugins, options);
  expect(options).toHaveProperty('renderNodeFunctions');
  expect(options.renderNodeFunctions.length).toEqual(4);
  expect(options.renderNodeFunctions).toEqual(['z', 'z', 'z', 'z']); // NOTE: <-- fragwürdig
});

test('inject returns the right amount of elements within it`s array', () => {
  const plugins = [{ renderNode: 'a' }, { renderNode: 'b' }, { renderNode: 'c' }];
  const options = {};
  const result = inject(plugins, options);
  expect(result.length).toEqual(plugins.length + 2);
});

test('ReactDnDPlugin returns an object with a renderNode and a plugins key', () => {
  const result = ReactDnDPlugin();
  expect(result).toHaveProperty('renderNode');
  expect(result).toHaveProperty('plugins');
});

test('if the passed options contain a renderNode key the ReactDnDPlugin.renderNode will return the options renderNode functions return-value', () => {
  const options = { renderNode: f => f };
  const ReactDnDPluginResult = ReactDnDPlugin(options);
  const input = 'test';
  const result = ReactDnDPluginResult.renderNode(input);
  expect(result).toEqual(input);
});

// NOTE: auch fragwürdig
test('if the passed options do not contain a renderNode key but have a renderNodeFunctions key which is containing at least one function (in an array) which returns a truthy value, the ReactDnDPluginResult.renderNode returns a react object', () => {
  const options = { renderNodeFunctions: [() => true] };
  const ReactDnDPluginResult = ReactDnDPlugin(options);
  const result = ReactDnDPluginResult.renderNode({});
  expect(typeof result).toEqual('object');
  expect(result).toHaveProperty('props');
  expect(result).toHaveProperty('type');
});

test('the by ReactDnDPlugin returned plugins array contains one object with a renderEditor function, which returns a react object when called', () => {
  const options = {};
  const ReactDnDPluginResult = ReactDnDPlugin(options);
  const result = ReactDnDPluginResult.plugins[0].renderEditor({}, {});
  expect(typeof result).toEqual('object');
  expect(result).toHaveProperty('props');
  expect(result).toHaveProperty('type');
});
