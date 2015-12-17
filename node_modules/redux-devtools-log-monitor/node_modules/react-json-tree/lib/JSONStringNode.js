'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _mixins = require('./mixins');

var _utilsHexToRgb = require('./utils/hexToRgb');

var _utilsHexToRgb2 = _interopRequireDefault(_utilsHexToRgb);

var styles = {
  base: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 0,
    marginLeft: 14,
    WebkitUserSelect: 'text',
    MozUserSelect: 'text'
  },
  label: {
    display: 'inline-block',
    marginRight: 5
  }
};

var JSONStringNode = (function (_React$Component) {
  _inherits(JSONStringNode, _React$Component);

  function JSONStringNode() {
    _classCallCheck(this, _JSONStringNode);

    _React$Component.apply(this, arguments);
  }

  JSONStringNode.prototype.render = function render() {
    var backgroundColor = 'transparent';
    if (this.props.previousValue !== this.props.value) {
      var bgColor = _utilsHexToRgb2['default'](this.props.theme.base06);
      backgroundColor = 'rgba(' + bgColor.r + ', ' + bgColor.g + ', ' + bgColor.b + ', 0.1)';
    }
    return _react2['default'].createElement(
      'li',
      { style: _extends({}, styles.base, { backgroundColor: backgroundColor }), onClick: this.handleClick.bind(this) },
      _react2['default'].createElement(
        'label',
        { style: _extends({}, styles.label, {
            color: this.props.theme.base0D
          }, this.props.styles.getLabelStyle('String', true)) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: _extends({
            color: this.props.theme.base0B
          }, this.props.styles.getValueStyle('String', true)) },
        '"',
        this.props.value,
        '"'
      )
    );
  };

  var _JSONStringNode = JSONStringNode;
  JSONStringNode = _reactMixin2['default'].decorate(_mixins.SquashClickEventMixin)(JSONStringNode) || JSONStringNode;
  return JSONStringNode;
})(_react2['default'].Component);

exports['default'] = JSONStringNode;
module.exports = exports['default'];