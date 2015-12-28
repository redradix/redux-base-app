'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _initializeState = require('../initializeState');

var _initializeState2 = _interopRequireDefault(_initializeState);

describe('initializeState', function () {
  it('should throw error when no fields passed', function () {
    _expect2['default'](function () {
      return _initializeState2['default']({}, undefined, {});
    }).toThrow(/fields must be passed/);
  });

  it('should return empty if no fields', function () {
    _expect2['default'](_initializeState2['default']({}, [], {})).toEqual({});
  });

  it('should return empty field entries for each field', function () {
    _expect2['default'](_initializeState2['default']({}, ['foo', 'bar'], {})).toEqual({ foo: {}, bar: {} });
  });

  it('should initialize simple field values to state', function () {
    _expect2['default'](_initializeState2['default']({
      foo: 'bar',
      catLives: 9,
      alive: true
    }, ['foo', 'catLives', 'alive'], {})).toBeA('object').toEqual({
      foo: {
        initial: 'bar',
        value: 'bar'
      },
      catLives: {
        initial: 9,
        value: 9
      },
      alive: {
        initial: true,
        value: true
      }
    });
  });

  it('should initialize deep field values to state', function () {
    _expect2['default'](_initializeState2['default']({
      foo: {
        bar: 'baz'
      },
      lives: {
        cat: 9
      },
      alive: true
    }, ['foo.bar', 'lives.cat', 'alive'], {})).toBeA('object').toEqual({
      foo: {
        bar: {
          initial: 'baz',
          value: 'baz'
        }
      },
      lives: {
        cat: {
          initial: 9,
          value: 9
        }
      },
      alive: {
        initial: true,
        value: true
      }
    });
  });

  it('should initialize array field values to state', function () {
    _expect2['default'](_initializeState2['default']({
      foo: ['bar', 'baz', undefined],
      alive: true
    }, ['foo[]', 'alive'], {})).toBeA('object').toEqual({
      foo: [{
        initial: 'bar',
        value: 'bar'
      }, {
        initial: 'baz',
        value: 'baz'
      }, {}],
      alive: {
        initial: true,
        value: true
      }
    });
  });

  it('should allow an array field to be empty', function () {
    _expect2['default'](_initializeState2['default']({
      foo: []
    }, ['foo[]'], {})).toBeA('object').toEqual({ foo: [] });
  });

  it('should initialize array values to state', function () {
    _expect2['default'](_initializeState2['default']({
      animals: ['cat', 'dog', 'rat'],
      bar: [{ deeper: 42 }]
    }, ['animals', 'bar'], {})).toBeA('object').toEqual({
      animals: {
        initial: ['cat', 'dog', 'rat'],
        value: ['cat', 'dog', 'rat']
      },
      bar: {
        initial: [{ deeper: 42 }],
        value: [{ deeper: 42 }]
      }
    });
  });

  it('should initialize array values to state, not changing existing values', function () {
    _expect2['default'](_initializeState2['default']({
      animals: ['cat', 'dog', 'rat'],
      bar: []
    }, ['animals', 'bar'], {
      bar: {
        value: [{ deeper: 42 }]
      }
    })).toBeA('object').toEqual({
      animals: {
        initial: ['cat', 'dog', 'rat'],
        value: ['cat', 'dog', 'rat']
      },
      bar: {
        initial: [],
        value: [{ deeper: 42 }]
      }
    });
  });

  it('should initialize object values to state', function () {
    _expect2['default'](_initializeState2['default']({
      foo: { bar: 'baz' },
      lives: { cat: 9 },
      alive: true
    }, ['foo', 'lives'], {})).toBeA('object').toEqual({
      foo: {
        initial: { bar: 'baz' },
        value: { bar: 'baz' }
      },
      lives: {
        initial: { cat: 9 },
        value: { cat: 9 }
      }
    });
  });
});