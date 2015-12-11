'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Expectation = require('./Expectation');

var _Expectation2 = _interopRequireDefault(_Expectation);

var Extensions = [];

function extend(extension) {
  if (Extensions.indexOf(extension) === -1) {
    Extensions.push(extension);

    for (var p in extension) {
      if (extension.hasOwnProperty(p)) _Expectation2['default'].prototype[p] = extension[p];
    }
  }
}

exports['default'] = extend;
module.exports = exports['default'];