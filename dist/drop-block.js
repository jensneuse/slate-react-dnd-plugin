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
var recompose_1 = require("recompose");
var react_dnd_1 = require("react-dnd");
var PropTypes = require("prop-types");
var const_1 = require("./const");
var target = {
    hover: function (props, monitor, component) {
        if (props.onHover) {
            return props.onHover(props, monitor, component);
        }
    },
    drop: function (props, monitor, component) {
        var item = monitor.getItem();
        component
            .context
            .getEditor()
            .change(function (change) {
            var parent = change
                .value
                .document
                .getParent(item.key);
            props.onDrop(item, parent, change);
        });
        return;
    },
    canDrop: function (props, monitor) {
        return props.canDrop(props, monitor);
    }
};
var DropBlock = /** @class */ (function (_super) {
    __extends(DropBlock, _super);
    function DropBlock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropBlock.prototype.render = function () {
        return this.props.connectDropTarget(this.props.children);
    };
    DropBlock.contextTypes = {
        getEditor: PropTypes.func
    };
    return DropBlock;
}(React.Component));
exports.default = recompose_1.compose(react_dnd_1.DropTarget(const_1.TARGET, target, function (connect) { return ({
    connectDropTarget: connect.dropTarget()
}); }))(DropBlock);
