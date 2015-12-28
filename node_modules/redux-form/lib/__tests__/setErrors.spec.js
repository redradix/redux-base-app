'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _setErrors = require('../setErrors');

var _setErrors2 = _interopRequireDefault(_setErrors);

describe('setErrors', function () {
  it('should not change if no errors', function () {
    _expect2['default'](_setErrors2['default']({ foo: 42, bar: true }, {}, '__err')).toEqual({ foo: 42, bar: true });
  });

  it('should not change if no errors and no state', function () {
    _expect2['default'](_setErrors2['default'](undefined, {}, '__err')).toEqual(undefined);
  });

  it('should set errors even when state is empty', function () {
    _expect2['default'](_setErrors2['default']({}, {
      foo: 'fooError',
      bar: 'barError'
    }, '__err')).toEqual({
      foo: {
        __err: 'fooError'
      },
      bar: {
        __err: 'barError'
      }
    });
  });

  it('should set errors even when state is null', function () {
    _expect2['default'](_setErrors2['default'](null, {
      foo: 'fooError'
    }, '__err')).toEqual({
      foo: {
        __err: 'fooError'
      }
    });
  });

  it('should ignore meta keys', function () {
    _expect2['default'](_setErrors2['default']({}, {
      _startsWithUnderscore: 'shouldBeIgnored'
    }, '__err')).toEqual({});
  });

  it('should set nested errors even when no state', function () {
    _expect2['default'](_setErrors2['default']({}, {
      dog: {
        foo: 'fooError',
        bar: 'barError'
      }
    }, '__err')).toEqual({
      dog: {
        foo: {
          __err: 'fooError'
        },
        bar: {
          __err: 'barError'
        }
      }
    });
  });

  it('should set array errors even when no state', function () {
    _expect2['default'](_setErrors2['default']({}, {
      dog: ['fooError', 'barError']
    }, '__err')).toEqual({
      dog: [{
        __err: 'fooError'
      }, {
        __err: 'barError'
      }]
    });
  });

  it('should set simple error', function () {
    _expect2['default'](_setErrors2['default']({
      foo: {
        value: 'bar'
      },
      cat: {
        value: 'rat'
      }
    }, {
      foo: 'fooError',
      cat: 'meow'
    }, '__err')).toEqual({
      foo: {
        value: 'bar',
        __err: 'fooError'
      },
      cat: {
        value: 'rat',
        __err: 'meow'
      }
    });
  });

  it('should unset simple error', function () {
    _expect2['default'](_setErrors2['default']({
      foo: {
        value: 'bar',
        __err: 'fooError'
      },
      cat: {
        value: 'rat',
        __err: 'meow'
      }
    }, {}, '__err')).toEqual({
      foo: {
        value: 'bar'
      },
      cat: {
        value: 'rat'
      }
    });
  });

  it('should set simple error with first error if given an array', function () {
    _expect2['default'](_setErrors2['default']({
      foo: {
        value: 'bar'
      }
    }, {
      foo: ['fooError1', 'fooError2']
    }, '__err')).toEqual({
      foo: {
        value: 'bar',
        __err: 'fooError1'
      }
    });
  });

  it('should set nested error', function () {
    _expect2['default'](_setErrors2['default']({
      dog: {
        foo: {
          value: 'bar'
        }
      }
    }, {
      dog: {
        foo: 'fooError'
      }
    }, '__err')).toEqual({
      dog: {
        foo: {
          value: 'bar',
          __err: 'fooError'
        }
      }
    });
  });

  it('should unset nested error', function () {
    _expect2['default'](_setErrors2['default']({
      dog: {
        foo: {
          value: 'bar',
          __err: 'fooError'
        }
      }
    }, {}, '__err')).toEqual({
      dog: {
        foo: {
          value: 'bar'
        }
      }
    });
  });

  it('should set nested error with first error if given an array', function () {
    _expect2['default'](_setErrors2['default']({
      dog: {
        foo: {
          value: 'bar'
        }
      }
    }, {
      dog: {
        foo: ['fooError1', 'fooError2']
      }
    }, '__err')).toEqual({
      dog: {
        foo: {
          value: 'bar',
          __err: 'fooError1'
        }
      }
    });
  });

  it('should set array error when state is array', function () {
    _expect2['default'](_setErrors2['default']({
      foo: [{
        value: 'bar'
      }]
    }, {
      foo: ['fooError', 'additionalErrorForUndefinedField']
    }, '__err')).toEqual({
      foo: [{
        value: 'bar',
        __err: 'fooError'
      }, {
        __err: 'additionalErrorForUndefinedField'
      }]
    });
  });

  it('should unset array error when state is array', function () {
    _expect2['default'](_setErrors2['default']({
      foo: [{
        value: 'bar',
        __err: 'fooError'
      }]
    }, {
      foo: []
    }, '__err')).toEqual({
      foo: [{
        value: 'bar'
      }]
    });
    _expect2['default'](_setErrors2['default']({
      foo: [{
        value: 'bar',
        __err: 'fooError'
      }]
    }, {}, '__err')).toEqual({
      foo: [{
        value: 'bar'
      }]
    });
  });
});