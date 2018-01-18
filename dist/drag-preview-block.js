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
    backgroundColor: 'white',
    cursor: 'move',
};
var DragPreviewBlockSource = {
    beginDrag: function (props, monitor, component) {
        return {};
    },
    endDrag: function (props, monitor, component) {
        console.log('endDragPreview', props);
        return {
            key: props.children.key
        };
    }
};
var DragPreviewBlock = /** @class */ (function (_super) {
    __extends(DragPreviewBlock, _super);
    function DragPreviewBlock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DragPreviewBlock.prototype.componentDidMount = function () {
        if (this.props.renderPreview) {
            this.props.connectDragPreview(this.props.renderPreview());
        }
    };
    DragPreviewBlock.prototype.render = function () {
        var _a = this.props, isDragging = _a.isDragging, connectDragSource = _a.connectDragSource, children = _a.children;
        var opacity = isDragging ? 0.4 : 1;
        return connectDragSource(React.createElement("div", { style: __assign({}, style, { opacity: opacity }) }, children));
    };
    return DragPreviewBlock;
}(React.Component));
exports.default = recompose_1.compose(react_dnd_1.DragSource(const_1.TARGET, DragPreviewBlockSource, function (connect, monitor) { return ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
}); }))(DragPreviewBlock);
