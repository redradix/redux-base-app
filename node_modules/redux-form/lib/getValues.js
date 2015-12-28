'use strict';

exports.__esModule = true;
var getValue = function getValue(field, state, dest) {
  var dotIndex = field.indexOf('.');
  var openIndex = field.indexOf('[');
  var closeIndex = field.indexOf(']');
  if (openIndex > 0 && closeIndex !== openIndex + 1) {
    throw new Error('found [ not followed by ]');
  }
  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
    (function () {
      // array field
      var key = field.substring(0, openIndex);
      var rest = field.substring(closeIndex + 1);
      if (rest[0] === '.') {
        rest = rest.substring(1);
      }
      var array = state && state[key] || [];
      if (rest) {
        if (!dest[key]) {
          dest[key] = [];
        }
        array.forEach(function (item, index) {
          if (!dest[key][index]) {
            dest[key][index] = {};
          }
          getValue(rest, item, dest[key][index]);
        });
      } else {
        dest[key] = array.map(function (item) {
          return item.value;
        });
      }
    })();
  } else if (dotIndex > 0) {
    // subobject field
    var key = field.substring(0, dotIndex);
    var rest = field.substring(dotIndex + 1);
    if (!dest[key]) {
      dest[key] = {};
    }
    getValue(rest, state && state[key] || {}, dest[key]);
  } else {
    dest[field] = state[field] && state[field].value;
  }
};

var getValues = function getValues(fields, state) {
  return fields.reduce(function (accumulator, field) {
    getValue(field, state, accumulator);
    return accumulator;
  }, {});
};

exports['default'] = getValues;
module.exports = exports['default'];