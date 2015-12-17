'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var styles = {
  base: {
    display: 'inline-block',
    marginLeft: 0,
    marginTop: 8,
    marginRight: 5,
    'float': 'left',
    transition: '150ms',
    WebkitTransition: '150ms',
    MozTransition: '150ms',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTopWidth: 5,
    borderTopStyle: 'solid',
    WebkitTransform: 'rotateZ(-90deg)',
    MozTransform: 'rotateZ(-90deg)',
    transform: 'rotateZ(-90deg)'
  },
  open: {
    WebkitTransform: 'rotateZ(0deg)',
    MozTransform: 'rotateZ(0deg)',
    transform: 'rotateZ(0deg)'
  }
};

var JSONArrow = (function (_React$Component) {
  _inherits(JSONArrow, _React$Component);

  function JSONArrow() {
    _classCallCheck(this, JSONArrow);

    _React$Component.apply(this, arguments);
  }

  JSONArrow.prototype.render = function render() {
    var style = _extends({}, styles.base, {
      borderTopColor: this.props.theme.base0D
    });
    if (this.props.open) {
      style = _extends({}, style, styles.open);
    }
    style = _extends({}, style, this.props.style);
    return _react2['default'].createElement('div', { style: style, onClick: this.props.onClick });
  };

  return JSONArrow;
})(_react2['default'].Component);

exports['default'] = JSONArrow;
module.exports = exports['default'];