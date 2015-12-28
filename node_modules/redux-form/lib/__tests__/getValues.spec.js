'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _getValues = require('../getValues');

var _getValues2 = _interopRequireDefault(_getValues);

describe('getValues', function () {
  it('should get values from form', function () {
    var form = {
      foo: { value: 'bar' },
      catLives: { value: 9 },
      alive: { value: true }
    };
    var fields = ['foo', 'catLives', 'alive'];
    _expect2['default'](_getValues2['default'](fields, form)).toBeA('object').toEqual({
      foo: 'bar',
      catLives: 9,
      alive: true
    });
  });

  it('should allow undefined values', function () {
    var form = {
      foo: { value: 'bar' }
    };
    var fields = ['foo', 'missing'];
    _expect2['default'](_getValues2['default'](fields, form)).toBeA('object').toEqual({
      foo: 'bar',
      missing: undefined
    });
  });

  it('should get values from deep form', function () {
    var form = {
      foo: {
        bar: { value: 'baz' }
      },
      lives: {
        cat: { value: 9 }
      },
      alive: { value: true }
    };
    var fields = ['foo.bar', 'lives.cat', 'alive'];
    _expect2['default'](_getValues2['default'](fields, form)).toBeA('object').toEqual({
      foo: {
        bar: 'baz'
      },
      lives: {
        cat: 9
      },
      alive: true
    });
  });

  it('should get values from array form', function () {
    var form = {
      foo: [{ value: 'bar' }, { value: 'baz' }, {}],
      alive: { value: true }
    };
    var fields = ['foo[]', 'alive'];
    _expect2['default'](_getValues2['default'](fields, form)).toBeA('object').toEqual({
      foo: ['bar', 'baz', undefined],
      alive: true
    });
  });

  it('should allow an array to be empty', function () {
    var form = {
      foo: []
    };
    var fields = ['foo[]'];
    _expect2['default'](_getValues2['default'](fields, form)).toBeA('object').toEqual({ foo: [] });
  });

  it('should get values from deep array form', function () {
    var form = {
      foo: {
        animals: [{ value: 'cat' }, { value: 'dog' }, { value: 'rat' }]
      },
      bar: [{
        deeper: {
          value: 42
        }
      }]
    };
    var fields = ['foo.animals[]', 'bar[].deeper'];
    _expect2['default'](_getValues2['default'](fields, form)).toBeA('object').toEqual({
      foo: {
        animals: ['cat', 'dog', 'rat']
      },
      bar: [{ deeper: 42 }]
    });
  });

  it('should ignore visited fields without values', function () {
    var form = {
      foo: {
        value: 'dog'
      },
      bar: {
        visited: true
      }
    };
    var fields = ['foo', 'bar'];
    _expect2['default'](_getValues2['default'](fields, form)).toBeA('object').toEqual({
      foo: 'dog',
      bar: undefined
    });
  });
});