"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var block_1 = require("./block");
var container_1 = require("./container");
exports.ReactDnDPlugin = function (options) {
    return {
        renderNode: function (props) {
            if (options.renderNode) {
                return options.renderNode(props);
            }
            if (options.renderNodeFunctions && options.renderNodeFunctions.length) {
                for (var i = 0; i < options.renderNodeFunctions.length; i++) {
                    var rendered = options.renderNodeFunctions[i](props);
                    if (rendered) {
                        return React.createElement(block_1.default, { editor: props.editor }, rendered);
                    }
                }
            }
            console.log('renderNode fn missing for type: ', props.node.type);
        },
        plugins: [
            {
                renderEditor: function (props, editor) {
                    return (React.createElement(container_1.default, __assign({ editor: editor }, props)));
                }
            }
        ]
    };
};
exports.inject = function (plugins, options) {
    var appendRenderNodeFuntion = function (fn) {
        if (!options.renderNodeFunctions) {
            options.renderNodeFunctions = [fn];
        }
        else {
            options.renderNodeFunctions[options.renderNodeFunctions.length + 1] = fn;
        }
    };
    for (var i = 0; i < plugins.length; i++) {
        if (plugins[i].renderNode) {
            appendRenderNodeFuntion(plugins[i].renderNode);
            if (plugins[i].plugins) {
                for (var k = 0; k < plugins[i].plugins.length; k++) {
                    appendRenderNodeFuntion(plugins[i].renderNode);
                }
            }
        }
    }
    var dndPlugin = exports.ReactDnDPlugin(options);
    return [dndPlugin].concat(dndPlugin.plugins, plugins);
};