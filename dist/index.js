"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var block_1 = require("./block");
var drag_preview_block_1 = require("./drag-preview-block");
exports.DragPreviewBlock = drag_preview_block_1.default;
var container_1 = require("./container");
exports.DragDropContainer = container_1.default;
var drop_block_1 = require("./drop-block");
exports.DropBlock = drop_block_1.default;
var DnDProvider = /** @class */ (function (_super) {
    __extends(DnDProvider, _super);
    function DnDProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DnDProvider.prototype.componentDidMount = function () {
        this.context.setEditor(this.props.editor);
    };
    DnDProvider.prototype.render = function () {
        return this.props.children;
    };
    DnDProvider.contextTypes = {
        setEditor: PropTypes.func
    };
    return DnDProvider;
}(React.Component));
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
                        return React.createElement(block_1.default, { renderBlock: options.renderBlock, editor: props.editor }, rendered);
                    }
                }
            }
            console.log('renderNode fn missing for type: ', props.node.type);
        },
        plugins: [
            {
                renderEditor: function (props, editor) {
                    return React.createElement(DnDProvider, { editor: editor }, props.children);
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
