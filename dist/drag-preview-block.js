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
var const_1 = require("./const");
var DragPreviewBlockSource = {
    beginDrag: function (props, monitor, component) {
        console.log('beginDragPreview', props);
        return {
            onHover: props.onHover
        };
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
            this.props.renderPreview(this.props, this.props.connectDragPreview);
        }
    };
    DragPreviewBlock.prototype.render = function () {
        var _a = this.props, isDragging = _a.isDragging, connectDragSource = _a.connectDragSource, children = _a.children;
        var opacity = isDragging ? 0.4 : 1;
        return connectDragSource(this.props.renderBlock(isDragging, children));
    };
    return DragPreviewBlock;
}(React.Component));
exports.default = recompose_1.compose(react_dnd_1.DragSource(const_1.TARGET, DragPreviewBlockSource, function (connect, monitor) { return ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
}); }))(DragPreviewBlock);
