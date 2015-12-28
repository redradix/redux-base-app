/**
 * A different version of getValues() that does not need the fields array
 */
'use strict';

exports.__esModule = true;
var getValuesFromState = function getValuesFromState(state) {
  if (!state) {
    return state;
  }
  var keys = Object.keys(state);
  if (!keys.length) {
    return undefined;
  }
  return keys.reduce(function (accumulator, key) {
    var field = state[key];
    if (field) {
      if (field.hasOwnProperty && field.hasOwnProperty('value')) {
        if (field.value !== undefined) {
          accumulator[key] = field.value;
        }
      } else if (Array.isArray(field)) {
        accumulator[key] = field.map(function (arrayField) {
          return arrayField.value || getValuesFromState(arrayField);
        });
      } else if (typeof field === 'object') {
        var result = getValuesFromState(field);

        if (result && Object.keys(result).length > 0) {
          accumulator[key] = result;
        }
      }
    }
    return accumulator;
  }, {});
};

exports['default'] = getValuesFromState;
module.exports = exports['default'];