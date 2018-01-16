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
var react_dnd_1 = require("react-dnd");
var recompose_1 = require("recompose");
var TARGET = 'DND_BLOCK';
var style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
var cardSource = {
    beginDrag: function () {
        return {};
    },
};
var getIndex = function (nodes, val) {
    for (var i = 0; i < nodes.length; i++) {
        if (val == nodes[i].key) {
            return i;
        }
    }
    return -1;
};
var changing = false;
var lastHoverIndex;
var lastKey;
var cardTarget = {
    hover: function (props, monitor, component) {
        if (changing) {
            return;
        }
        if (lastKey === props.children.key) {
            return;
        }
        lastKey = props.children.key;
        var hoverIndex = getIndex(props.editor.state.value.document.nodes._tail.array, props.children.key);
        if (hoverIndex === -1) {
            return;
        }
        if (lastHoverIndex === hoverIndex) {
            return;
        }
        lastHoverIndex = hoverIndex;
        var dragIndex = monitor.getItem().index;
        if (dragIndex !== hoverIndex) {
            changing = true;
            props.editor.change(function (change) {
                change.value.blocks.some(function (block) {
                    var parent = change.value.document.getParent(block.key);
                    change.moveNodeByKey(block.key, parent.key, hoverIndex);
                    changing = false;
                });
            });
        }
    },
};
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Block.prototype.render = function () {
        var _a = this.props, connectDragSource = _a.connectDragSource, connectDropTarget = _a.connectDropTarget, isDragging = _a.isDragging, children = _a.children;
        var opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(React.createElement("div", { style: __assign({}, style, { opacity: opacity }) }, children)));
    };
    return Block;
}(React.Component));
exports.default = recompose_1.compose(react_dnd_1.DropTarget(TARGET, cardTarget, function (connect) { return ({
    connectDropTarget: connect.dropTarget(),
}); }), react_dnd_1.DragSource(TARGET, cardSource, function (connect, monitor) { return ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}); }))(Block);
