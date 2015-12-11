'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _isRegexp = require('is-regexp');

var _isRegexp2 = _interopRequireDefault(_isRegexp);

var _assert = require('./assert');

var _assert2 = _interopRequireDefault(_assert);

var _SpyUtils = require('./SpyUtils');

var _TestUtils = require('./TestUtils');

/**
 * An Expectation is a wrapper around an assertion that allows it to be written
 * in a more natural style, without the need to remember the order of arguments.
 * This helps prevent you from making mistakes when writing tests.
 */

var Expectation = (function () {
  function Expectation(actual) {
    _classCallCheck(this, Expectation);

    this.actual = actual;

    if (_TestUtils.isFunction(actual)) {
      this.context = null;
      this.args = [];
    }
  }

  Expectation.prototype.toExist = function toExist(message) {
    _assert2['default'](this.actual, message || 'Expected %s to exist', this.actual);

    return this;
  };

  Expectation.prototype.toNotExist = function toNotExist(message) {
    _assert2['default'](!this.actual, message || 'Expected %s to not exist', this.actual);

    return this;
  };

  Expectation.prototype.toBe = function toBe(value, message) {
    _assert2['default'](this.actual === value, message || 'Expected %s to be %s', this.actual, value);

    return this;
  };

  Expectation.prototype.toNotBe = function toNotBe(value, message) {
    _assert2['default'](this.actual !== value, message || 'Expected %s to not be %s', this.actual, value);

    return this;
  };

  Expectation.prototype.toEqual = function toEqual(value, message) {
    try {
      _assert2['default'](_deepEqual2['default'](this.actual, value), message || 'Expected %s to equal %s', this.actual, value);
    } catch (e) {
      // These attributes are consumed by Mocha to produce a diff output.
      e.showDiff = true;
      e.actual = this.actual;
      e.expected = value;
      throw e;
    }

    return this;
  };

  Expectation.prototype.toNotEqual = function toNotEqual(value, message) {
    _assert2['default'](!_deepEqual2['default'](this.actual, value), message || 'Expected %s to not equal %s', this.actual, value);

    return this;
  };

  Expectation.prototype.toThrow = function toThrow(value, message) {
    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).toThrow() must be a function, %s was given', this.actual);

    _assert2['default'](_TestUtils.functionThrows(this.actual, this.context, this.args, value), message || 'Expected %s to throw %s', this.actual, value || 'an error');

    return this;
  };

  Expectation.prototype.toNotThrow = function toNotThrow(value, message) {
    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).toNotThrow() must be a function, %s was given', this.actual);

    _assert2['default'](!_TestUtils.functionThrows(this.actual, this.context, this.args, value), message || 'Expected %s to not throw %s', this.actual, value || 'an error');

    return this;
  };

  Expectation.prototype.toBeA = function toBeA(value, message) {
    _assert2['default'](_TestUtils.isFunction(value) || typeof value === 'string', 'The "value" argument in toBeA(value) must be a function or a string');

    _assert2['default'](_TestUtils.isA(this.actual, value), message || 'Expected %s to be a %s', this.actual, value);

    return this;
  };

  Expectation.prototype.toNotBeA = function toNotBeA(value, message) {
    _assert2['default'](_TestUtils.isFunction(value) || typeof value === 'string', 'The "value" argument in toNotBeA(value) must be a function or a string');

    _assert2['default'](!_TestUtils.isA(this.actual, value), message || 'Expected %s to be a %s', this.actual, value);

    return this;
  };

  Expectation.prototype.toMatch = function toMatch(pattern, message) {
    _assert2['default'](typeof this.actual === 'string', 'The "actual" argument in expect(actual).toMatch() must be a string');

    _assert2['default'](_isRegexp2['default'](pattern), 'The "value" argument in toMatch(value) must be a RegExp');

    _assert2['default'](pattern.test(this.actual), message || 'Expected %s to match %s', this.actual, pattern);

    return this;
  };

  Expectation.prototype.toNotMatch = function toNotMatch(pattern, message) {
    _assert2['default'](typeof this.actual === 'string', 'The "actual" argument in expect(actual).toNotMatch() must be a string');

    _assert2['default'](_isRegexp2['default'](pattern), 'The "value" argument in toNotMatch(value) must be a RegExp');

    _assert2['default'](!pattern.test(this.actual), message || 'Expected %s to not match %s', this.actual, pattern);

    return this;
  };

  Expectation.prototype.toBeLessThan = function toBeLessThan(value, message) {
    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeLessThan() must be a number');

    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeLessThan(value) must be a number');

    _assert2['default'](this.actual < value, message || 'Expected %s to be less than %s', this.actual, value);

    return this;
  };

  Expectation.prototype.toBeGreaterThan = function toBeGreaterThan(value, message) {
    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeGreaterThan() must be a number');

    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeGreaterThan(value) must be a number');

    _assert2['default'](this.actual > value, message || 'Expected %s to be greater than %s', this.actual, value);

    return this;
  };

  Expectation.prototype.toInclude = function toInclude(value, comparator, message) {
    _assert2['default'](_TestUtils.isArray(this.actual) || typeof this.actual === 'string', 'The "actual" argument in expect(actual).toInclude() must be an array or a string');

    if (typeof comparator === 'string') {
      message = comparator;
      comparator = null;
    }

    message = message || 'Expected %s to include %s';

    if (_TestUtils.isArray(this.actual)) {
      _assert2['default'](_TestUtils.arrayContains(this.actual, value, comparator), message, this.actual, value);
    } else {
      _assert2['default'](_TestUtils.stringContains(this.actual, value), message, this.actual, value);
    }

    return this;
  };

  Expectation.prototype.toExclude = function toExclude(value, comparator, message) {
    _assert2['default'](_TestUtils.isArray(this.actual) || typeof this.actual === 'string', 'The "actual" argument in expect(actual).toExclude() must be an array or a string');

    if (typeof comparator === 'string') {
      message = comparator;
      comparator = null;
    }

    message = message || 'Expected %s to exclude %s';

    if (_TestUtils.isArray(this.actual)) {
      _assert2['default'](!_TestUtils.arrayContains(this.actual, value, comparator), message, this.actual, value);
    } else {
      _assert2['default'](!_TestUtils.stringContains(this.actual, value), message, this.actual, value);
    }

    return this;
  };

  Expectation.prototype.toHaveBeenCalled = function toHaveBeenCalled(message) {
    var spy = this.actual;

    _assert2['default'](_SpyUtils.isSpy(spy), 'The "actual" argument in expect(actual).toHaveBeenCalled() must be a spy');

    _assert2['default'](spy.calls.length > 0, message || 'spy was not called');

    return this;
  };

  Expectation.prototype.toHaveBeenCalledWith = function toHaveBeenCalledWith() {
    var spy = this.actual;

    _assert2['default'](_SpyUtils.isSpy(spy), 'The "actual" argument in expect(actual).toHaveBeenCalledWith() must be a spy');

    var expectedArgs = Array.prototype.slice.call(arguments, 0);

    _assert2['default'](spy.calls.some(function (call) {
      return _deepEqual2['default'](call.arguments, expectedArgs);
    }), 'spy was never called with %s', expectedArgs);

    return this;
  };

  Expectation.prototype.toNotHaveBeenCalled = function toNotHaveBeenCalled(message) {
    var spy = this.actual;

    _assert2['default'](_SpyUtils.isSpy(spy), 'The "actual" argument in expect(actual).toNotHaveBeenCalled() must be a spy');

    _assert2['default'](spy.calls.length === 0, message || 'spy was not supposed to be called');

    return this;
  };

  Expectation.prototype.withContext = function withContext(context) {
    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).withContext() must be a function');

    this.context = context;

    return this;
  };

  Expectation.prototype.withArgs = function withArgs() {
    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).withArgs() must be a function');

    if (arguments.length) this.args = this.args.concat(Array.prototype.slice.call(arguments, 0));

    return this;
  };

  return Expectation;
})();

var aliases = {
  toBeAn: 'toBeA',
  toNotBeAn: 'toNotBeA',
  toBeTruthy: 'toExist',
  toBeFalsy: 'toNotExist',
  toBeFewerThan: 'toBeLessThan',
  toBeMoreThan: 'toBeGreaterThan',
  toContain: 'toInclude',
  toNotContain: 'toExclude'
};

for (var alias in aliases) {
  Expectation.prototype[alias] = Expectation.prototype[aliases[alias]];
}exports['default'] = Expectation;
module.exports = exports['default'];