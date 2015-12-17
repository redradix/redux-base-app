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

var JSONBooleanNode = (function (_React$Component) {
  _inherits(JSONBooleanNode, _React$Component);

  function JSONBooleanNode() {
    _classCallCheck(this, _JSONBooleanNode);

    _React$Component.apply(this, arguments);
  }

  JSONBooleanNode.prototype.render = function render() {
    var truthString = this.props.value ? 'true' : 'false';
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
          }, this.props.styles.getLabelStyle('Boolean', true)) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: _extends({
            color: this.props.theme.base09
          }, this.props.styles.getValueStyle('Boolean', true)) },
        truthString
      )
    );
  };

  var _JSONBooleanNode = JSONBooleanNode;
  JSONBooleanNode = _reactMixin2['default'].decorate(_mixins.SquashClickEventMixin)(JSONBooleanNode) || JSONBooleanNode;
  return JSONBooleanNode;
})(_react2['default'].Component);

exports['default'] = JSONBooleanNode;
module.exports = exports['default'];