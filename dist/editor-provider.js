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
var EditorProvider = /** @class */ (function (_super) {
    __extends(EditorProvider, _super);
    function EditorProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            editor: null
        };
        return _this;
    }
    EditorProvider.prototype.getChildContext = function () {
        var that = this;
        return {
            getEditor: function () {
                return that.state.editor;
            },
            setEditor: function (editor) {
                that.setState({ editor: editor });
            }
        };
    };
    EditorProvider.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    EditorProvider.childContextTypes = {
        setEditor: PropTypes.func,
        getEditor: PropTypes.func
    };
    return EditorProvider;
}(React.Component));
exports.default = EditorProvider;
