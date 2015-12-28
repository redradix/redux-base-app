'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _resetState = require('../resetState');

var _resetState2 = _interopRequireDefault(_resetState);

describe('resetState', function () {
  it('should return empty if no values', function () {
    _expect2['default'](_resetState2['default']({})).toEqual({});
  });

  it('should reset simple values', function () {
    _expect2['default'](_resetState2['default']({
      foo: {
        initial: 'dog',
        value: 'cat'
      },
      bar: {
        initial: 'rat',
        value: 'pig'
      },
      baz: {
        initial: 'hog',
        value: 'bun'
      }
    })).toBeA('object').toEqual({
      foo: {
        initial: 'dog',
        value: 'dog'
      },
      bar: {
        initial: 'rat',
        value: 'rat'
      },
      baz: {
        initial: 'hog',
        value: 'hog'
      }
    });
  });

  it('should reset deep values', function () {
    _expect2['default'](_resetState2['default']({
      foo: {
        bar: {
          initial: 'dog',
          value: 'cat'
        }
      },
      baz: {
        chad: {
          initial: 'fun',
          value: 'bun'
        },
        chaz: {
          value: 'shouldbesettoundefined'
        }
      }
    })).toBeA('object').toEqual({
      foo: {
        bar: {
          initial: 'dog',
          value: 'dog'
        }
      },
      baz: {
        chad: {
          initial: 'fun',
          value: 'fun'
        },
        chaz: {}
      }
    });
  });

  it('should reset array values', function () {
    _expect2['default'](_resetState2['default']({
      foo: [{
        initial: 'cat',
        value: 'dog'
      }, {
        initial: 'rat',
        value: 'pig'
      }, {
        value: 'shouldbesettoundefined'
      }]
    })).toBeA('object').toEqual({
      foo: [{
        initial: 'cat',
        value: 'cat'
      }, {
        initial: 'rat',
        value: 'rat'
      }, {}]
    });
  });

  it('should allow an array to be empty', function () {
    _expect2['default'](_resetState2['default']({
      foo: []
    })).toBeA('object').toEqual({ foo: [] });
  });
});