'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectInspect = require('object-inspect');

var _objectInspect2 = _interopRequireDefault(_objectInspect);

function invariant(condition, messageFormat) {
  if (condition) return;

  var extraArgs = Array.prototype.slice.call(arguments, 2);
  var index = 0;

  throw new Error(messageFormat.replace(/%s/g, function () {
    return _objectInspect2['default'](extraArgs[index++]);
  }));
}

exports['default'] = invariant;
module.exports = exports['default'];