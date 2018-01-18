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
var const_1 = require("./const");
var style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};
var cardSource = {
    beginDrag: function (props, monitor, component) {
        console.log('beginDrag', props);
        return { key: props.children.key };
    },
    endDrag: function (props, monitor, component) {
        console.log('endDrag', props);
        return {
            key: props.children.key
        };
    }
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
//let lastHoverIndex : number;
var cardTarget = {
    canDrop: function () {
        return true;
    },
    drop: function (props, monitor, component) {
        console.log('drop', props, monitor, component);
    },
    hover: function (props, monitor, component) {
        if (changing) {
            return;
        }
        var hoverIndex = getIndex(props.editor.state.value.document.nodes._tail.array, props.children.key);
        //console.log('hoverIndex', hoverIndex);
        if (hoverIndex === -1) {
            console.log('hoverIndex === -1');
            return;
        }
        var item = monitor.getItem();
        changing = true;
        if (!item.key) {
            changing = true;
            props
                .editor
                .change(function (change) {
                var parent = change
                    .value
                    .document
                    .getParent(props.children.key);
                console.log('insert', parent, hoverIndex);
                var result = change.insertNodeByKey(parent.key, hoverIndex, {
                    object: 'block',
                    type: 'paragraph',
                    nodes: [
                        {
                            object: 'text',
                            leaves: [
                                {
                                    text: 'A new Block via drag&drop'
                                }
                            ]
                        }
                    ]
                });
                item.key = result.value.document.nodes._tail.array[hoverIndex].key;
                changing = false;
                return item;
            });
        }
        else {
            if (props.children.key === item.key) {
                changing = false;
                return;
            }
            props
                .editor
                .change(function (change) {
                var parent = change
                    .value
                    .document
                    .getParent(item.key);
                change.moveNodeByKey(item.key, parent.key, hoverIndex);
                changing = false;
            });
        }
    }
};
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Block.prototype.render = function () {
        var _a = this.props, connectDragSource = _a.connectDragSource, connectDropTarget = _a.connectDropTarget, isDragging = _a.isDragging, children = _a.children;
        var opacity = isDragging
            ? 0
            : 1;
        return connectDragSource(connectDropTarget(React.createElement("div", { style: __assign({}, style, { opacity: opacity }) }, children)));
    };
    return Block;
}(React.Component));
exports.default = recompose_1.compose(react_dnd_1.DropTarget(const_1.TARGET, cardTarget, function (connect) { return ({
    connectDropTarget: connect.dropTarget()
}); }), react_dnd_1.DragSource(const_1.TARGET, cardSource, function (connect, monitor) { return ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}); }))(Block);
