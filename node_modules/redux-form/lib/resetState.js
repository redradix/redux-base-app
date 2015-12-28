'use strict';

exports.__esModule = true;
var reset = function reset(value) {
  return value === undefined || value && value.initial === undefined ? {} : { initial: value.initial, value: value.initial };
};
var isLeaf = function isLeaf(value) {
  return value && typeof value === 'object' && (value.value !== undefined || value.initial !== undefined);
};

/**
 * Sets the initial values into the state and returns a new copy of the state
 */
var resetState = function resetState(values) {
  return values ? Object.keys(values).reduce(function (accumulator, key) {
    var value = values[key];
    if (Array.isArray(value)) {
      accumulator[key] = value.map(function (item) {
        return isLeaf(item) ? reset(item) : resetState(item);
      });
    } else if (value) {
      if (isLeaf(value)) {
        accumulator[key] = reset(value);
      } else if (typeof value === 'object' && value !== null) {
        accumulator[key] = resetState(value);
      } else {
        accumulator[key] = value;
      }
    }
    return accumulator;
  }, {}) : values;
};

exports['default'] = resetState;
module.exports = exports['default'];