'use strict';

var _Symbol$iterator = require('babel-runtime/core-js/symbol/iterator')['default'];

exports.__esModule = true;

exports['default'] = function (obj) {
  if (obj !== null && typeof obj === 'object' && !Array.isArray(obj) && typeof obj[_Symbol$iterator] === 'function') {
    return 'Iterable';
  }
  return Object.prototype.toString.call(obj).slice(8, -1);
};

module.exports = exports['default'];