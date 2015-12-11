'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

/**
 * Returns true if the given object is an instanceof value
 * or its typeof is the given value.
 */
function isA(object, value) {
  if (_isFunction2['default'](value)) return object instanceof value;

  if (value === 'array') return Array.isArray(object);

  return typeof object === value;
}

exports['default'] = isA;
module.exports = exports['default'];