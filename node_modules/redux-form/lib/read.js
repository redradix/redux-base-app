/**
 * Reads any potentially deep value from an object using dot and array syntax
 */
'use strict';

exports.__esModule = true;
var read = function read(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var path = _x,
        object = _x2;
    _again = false;

    if (!path || !object) {
      return object;
    }
    var dotIndex = path.indexOf('.');
    if (dotIndex === 0) {
      _x = path.substring(1);
      _x2 = object;
      _again = true;
      dotIndex = undefined;
      continue _function;
    }
    var openIndex = path.indexOf('[');
    var closeIndex = path.indexOf(']');
    if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
      // iterate down object tree
      _x = path.substring(dotIndex + 1);
      _x2 = object[path.substring(0, dotIndex)];
      _again = true;
      dotIndex = openIndex = closeIndex = undefined;
      continue _function;
    }
    if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
      if (closeIndex < 0) {
        throw new Error('found [ but no ]');
      }
      var key = path.substring(0, openIndex);
      var index = path.substring(openIndex + 1, closeIndex);
      if (!index.length) {
        return object[key];
      }
      if (openIndex === 0) {
        _x = path.substring(closeIndex + 1);
        _x2 = object[index];
        _again = true;
        dotIndex = openIndex = closeIndex = key = index = undefined;
        continue _function;
      }
      if (!object[key]) {
        return undefined;
      }
      _x = path.substring(closeIndex + 1);
      _x2 = object[key][index];
      _again = true;
      dotIndex = openIndex = closeIndex = key = index = undefined;
      continue _function;
    }
    return object[path];
  }
};

exports['default'] = read;
module.exports = exports['default'];