/**
 * Returns true if the given array contains the value, false
 * otherwise. The comparator function must return false to
 * indicate a non-match.
 */
"use strict";

exports.__esModule = true;
function arrayContains(array, value, comparator) {
  if (comparator == null) return array.indexOf(value) !== -1;

  return array.some(function (item) {
    return comparator(item, value) !== false;
  });
}

exports["default"] = arrayContains;
module.exports = exports["default"];