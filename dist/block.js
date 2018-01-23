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
var react_dnd_1 = require("react-dnd");
var recompose_1 = require("recompose");
var react_dom_1 = require("react-dom");
var const_1 = require("./const");
var dragSource = {
    beginDrag: function (props, monitor, component) {
        return { key: props.children.key };
    },
    endDrag: function (props, monitor, component) {
        return { key: props.children.key };
    }
};
var getIndex = function (nodes, val) {
    if (!val) {
        return -1;
    }
    if (nodes && nodes.length) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] && nodes[i].key && val == nodes[i].key) {
                return i;
            }
        }
    }
    return -1;
};
var changing = false;
var dragTarget = {
    hover: function (props, monitor, component) {
        if (changing || !props.children || !props.children.key) {
            return;
        }
        var hoverIndex = getIndex(props.editor.state.value.document.nodes._tail.array, props.children.key);
        if (hoverIndex === -1) {
            return;
        }
        var item = monitor.getItem();
        changing = true;
        if (!item.key && item.onHover) {
            changing = true;
            props
                .editor
                .change(function (change) {
                var parent = change
                    .value
                    .document
                    .getParent(props.children.key);
                item.onHover(hoverIndex, item, parent, change);
                changing = false;
            });
        }
        else {
            if (props.children.key === item.key) {
                changing = false;
                return;
            }
            var dragIndex = getIndex(props.editor.state.value.document.nodes._tail.array, item.key);
            var hoverBoundingRect = react_dom_1.findDOMNode(component).getBoundingClientRect();
            var clientOffset = monitor.getClientOffset();
            var middle = hoverBoundingRect.bottom - (hoverBoundingRect.height / 2);
            var mouseY = clientOffset.y;
            if (dragIndex > hoverIndex && mouseY > middle || dragIndex < hoverIndex && mouseY < middle) {
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
        var _a = this.props, connectDragSource = _a.connectDragSource, connectDropTarget = _a.connectDropTarget, isDragging = _a.isDragging, children = _a.children, renderBlock = _a.renderBlock;
        return connectDragSource(connectDropTarget(renderBlock(isDragging, children)));
    };
    return Block;
}(React.Component));
exports.default = recompose_1.compose(react_dnd_1.DropTarget(const_1.TARGET, dragTarget, function (connect) { return ({
    connectDropTarget: connect.dropTarget()
}); }), react_dnd_1.DragSource(const_1.TARGET, dragSource, function (connect, monitor) { return ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}); }))(Block);
