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
            return React.createElement(block_1.default, { editor: props.editor }, options.renderNodeBlock(props));
        },
        plugins: [
            {
                renderEditor: function (props, editor) {
                    return React.createElement(container_1.default, __assign({ editor: editor }, props));
                }
            }
        ]
    };
};
