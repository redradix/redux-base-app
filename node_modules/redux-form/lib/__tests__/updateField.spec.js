'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _updateField = require('../updateField');

var _updateField2 = _interopRequireDefault(_updateField);

describe('updateField', function () {
  it('should return new field object when something changes', function () {
    var field = { value: 'foo' };
    var result = _updateField2['default'](field, { value: 'bar' }, false, undefined);
    _expect2['default'](result).toNotBe(field);
  });

  it('should set value', function () {
    _expect2['default'](_updateField2['default']({}, { value: 'foo' }, true, undefined).value).toBe('foo');
    _expect2['default'](_updateField2['default']({ value: 'foo' }, { value: 'bar' }, true, undefined).value).toBe('bar');
    _expect2['default'](_updateField2['default']({}, { value: 42 }, true, undefined).value).toBe(42);
    _expect2['default'](_updateField2['default']({ value: 3 }, { value: 42 }, true, undefined).value).toBe(42);
  });

  it('should set pristine and dirty', function () {
    var result1 = _updateField2['default']({}, { value: 'foo', initial: 'foo' }, false, undefined);
    _expect2['default'](result1.dirty).toBe(false);
    _expect2['default'](result1.pristine).toBe(true);
    var result2 = _updateField2['default']({}, { value: 'foo', initial: 'bar' }, false, undefined);
    _expect2['default'](result2.dirty).toBe(true);
    _expect2['default'](result2.pristine).toBe(false);

    // test that it overwrites existing flags
    var result3 = _updateField2['default']({ dirty: true, pristine: false }, { value: 'foo', initial: 'foo' }, false, undefined);
    _expect2['default'](result3.dirty).toBe(false);
    _expect2['default'](result3.pristine).toBe(true);
    var result4 = _updateField2['default']({ dirty: false, pristine: true }, { value: 'foo', initial: 'bar' }, false, undefined);
    _expect2['default'](result4.dirty).toBe(true);
    _expect2['default'](result4.pristine).toBe(false);
  });

  it('should have no error when no errors', function () {
    _expect2['default'](_updateField2['default']({}, {}, false, undefined).error).toBe(undefined);
  });

  it('should set error from sync error', function () {
    _expect2['default'](_updateField2['default']({}, {}, false, 'foo').error).toBe('foo');
    _expect2['default'](_updateField2['default']({}, {}, false, 'bar').error).toBe('bar');
  });

  it('should set error from submit error', function () {
    _expect2['default'](_updateField2['default']({}, { submitError: 'foo' }, false, undefined).error).toBe('foo');
    _expect2['default'](_updateField2['default']({}, { submitError: 'bar' }, false, undefined).error).toBe('bar');
  });

  it('should set error from async error', function () {
    _expect2['default'](_updateField2['default']({}, { asyncError: 'foo' }, false, undefined).error).toBe('foo');
    _expect2['default'](_updateField2['default']({}, { asyncError: 'bar' }, false, undefined).error).toBe('bar');
  });

  it('should prioritize submit error over async error', function () {
    _expect2['default'](_updateField2['default']({}, { asyncError: 'fooAsync', submitError: 'fooSubmit' }, false, undefined).error).toBe('fooSubmit');
    _expect2['default'](_updateField2['default']({}, { asyncError: 'barAsync', submitError: 'barSubmit' }, false, undefined).error).toBe('barSubmit');
  });

  it('should prioritize sync error over async error', function () {
    _expect2['default'](_updateField2['default']({}, { asyncError: 'fooAsync' }, false, 'fooSync').error).toBe('fooSync');
    _expect2['default'](_updateField2['default']({}, { asyncError: 'barAsync' }, false, 'barSync').error).toBe('barSync');
  });

  it('should prioritize sync error over submit error', function () {
    _expect2['default'](_updateField2['default']({}, { submitError: 'fooSubmit' }, false, 'fooSync').error).toBe('fooSync');
    _expect2['default'](_updateField2['default']({}, { submitError: 'barSubmit' }, false, 'barSync').error).toBe('barSync');
  });

  it('should prioritize sync error over submit and async error', function () {
    _expect2['default'](_updateField2['default']({}, { asyncError: 'fooAsync', submitError: 'fooSubmit' }, false, 'fooSync').error).toBe('fooSync');
    _expect2['default'](_updateField2['default']({}, { asyncError: 'barAsync', submitError: 'barSubmit' }, false, 'barSync').error).toBe('barSync');
  });

  it('should set valid/invalid', function () {
    var result1 = _updateField2['default']({}, {}, false, undefined);
    _expect2['default'](result1.valid).toBe(true);
    _expect2['default'](result1.invalid).toBe(false);
    var result2 = _updateField2['default']({}, {}, false, 'sync error');
    _expect2['default'](result2.valid).toBe(false);
    _expect2['default'](result2.invalid).toBe(true);

    // test that it overwrites existing flags
    var result3 = _updateField2['default']({ valid: false, invalid: true }, {}, false, undefined);
    _expect2['default'](result3.valid).toBe(true);
    _expect2['default'](result3.invalid).toBe(false);
    var result4 = _updateField2['default']({ valid: true, invalid: false }, {}, false, 'sync error');
    _expect2['default'](result4.valid).toBe(false);
    _expect2['default'](result4.invalid).toBe(true);
  });

  it('should set active', function () {
    _expect2['default'](_updateField2['default']({}, {}, true, undefined).active).toBe(true);
    _expect2['default'](_updateField2['default']({ active: false }, {}, true, undefined).active).toBe(true);
    _expect2['default'](_updateField2['default']({}, {}, false, undefined).active).toBe(false);
    _expect2['default'](_updateField2['default']({ active: true }, {}, false, undefined).active).toBe(false);
  });

  it('should set touched', function () {
    // init
    _expect2['default'](_updateField2['default']({}, { touched: true }, false, undefined).touched).toBe(true);
    _expect2['default'](_updateField2['default']({}, { touched: false }, false, undefined).touched).toBe(false);
    _expect2['default'](_updateField2['default']({}, {}, false, undefined).touched).toBe(false);
    // update
    _expect2['default'](_updateField2['default']({ touched: false }, { touched: true }, false, undefined).touched).toBe(true);
    _expect2['default'](_updateField2['default']({ touched: true }, { touched: false }, false, undefined).touched).toBe(false);
    _expect2['default'](_updateField2['default']({ touched: true }, {}, false, undefined).touched).toBe(false);
  });

  it('should set visited', function () {
    // init
    _expect2['default'](_updateField2['default']({}, { visited: true }, false, undefined).visited).toBe(true);
    _expect2['default'](_updateField2['default']({}, { visited: false }, false, undefined).visited).toBe(false);
    _expect2['default'](_updateField2['default']({}, {}, false, undefined).visited).toBe(false);
    // update
    _expect2['default'](_updateField2['default']({ visited: false }, { visited: true }, false, undefined).visited).toBe(true);
    _expect2['default'](_updateField2['default']({ visited: true }, { visited: false }, false, undefined).visited).toBe(false);
    _expect2['default'](_updateField2['default']({ visited: true }, {}, false, undefined).visited).toBe(false);
  });
});