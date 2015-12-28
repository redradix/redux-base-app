'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _readField = require('../readField');

var _readField2 = _interopRequireDefault(_readField);

var noop = function noop() {
  return null;
};

var createRestorableSpy = function createRestorableSpy(fn) {
  return _expect.createSpy(fn, function restore() {
    this.calls = [];
  });
};

describe('readField', function () {
  var blur = createRestorableSpy();
  var change = createRestorableSpy();
  var focus = createRestorableSpy();
  var defaultProps = {
    asyncBlurFields: [],
    blur: blur,
    change: change,
    focus: focus,
    form: {},
    initialValues: {},
    readonly: false,
    addArrayValue: noop,
    removeArrayValue: noop
  };

  var expectField = function expectField(_ref) {
    var field = _ref.field;
    var name = _ref.name;
    var value = _ref.value;
    var dirty = _ref.dirty;
    var touched = _ref.touched;
    var visited = _ref.visited;
    var error = _ref.error;
    var initialValue = _ref.initialValue;
    var readonly = _ref.readonly;
    var checked = _ref.checked;

    _expect2['default'](field).toExist().toBeA('object');
    _expect2['default'](field.name).toBe(name);
    _expect2['default'](field.value).toEqual(value);
    if (readonly) {
      _expect2['default'](field.onBlur).toNotExist();
      _expect2['default'](field.onChange).toNotExist();
      _expect2['default'](field.onDragStart).toNotExist();
      _expect2['default'](field.onDrop).toNotExist();
      _expect2['default'](field.onFocus).toNotExist();
      _expect2['default'](field.onUpdate).toNotExist();
    } else {
      _expect2['default'](field.onBlur).toBeA('function');
      _expect2['default'](field.onChange).toBeA('function');
      _expect2['default'](field.onDragStart).toBeA('function');
      _expect2['default'](field.onDrop).toBeA('function');
      _expect2['default'](field.onFocus).toBeA('function');
      _expect2['default'](field.onUpdate).toBeA('function');
      _expect2['default'](field.onUpdate).toBe(field.onChange);

      // call blur
      _expect2['default'](blur.calls.length).toBe(0);
      field.onBlur('newValue');
      _expect2['default'](blur.calls.length).toBe(1);
      _expect2['default'](blur).toHaveBeenCalled().toHaveBeenCalledWith(name, 'newValue');

      // call change
      _expect2['default'](change.calls.length).toBe(0);
      field.onChange('newValue');
      _expect2['default'](change.calls.length).toBe(1);
      _expect2['default'](change).toHaveBeenCalled().toHaveBeenCalledWith(name, 'newValue');

      // call focus
      _expect2['default'](focus.calls.length).toBe(0);
      field.onFocus();
      _expect2['default'](focus.calls.length).toBe(1);
      _expect2['default'](focus).toHaveBeenCalled();
    }
    _expect2['default'](field.defaultChecked).toBe(initialValue === true);
    _expect2['default'](field.defaultValue).toBe(initialValue);
    _expect2['default'](field.initialValue).toBe(initialValue);
    _expect2['default'](field.error).toBe(error);
    _expect2['default'](field.valid).toBe(!error);
    _expect2['default'](field.invalid).toBe(!!error);
    _expect2['default'](field.dirty).toBe(dirty);
    _expect2['default'](field.pristine).toBe(!dirty);
    _expect2['default'](field.touched).toBe(touched);
    _expect2['default'](field.visited).toBe(visited);
    _expect2['default'](field.checked).toBe(checked);

    blur.restore();
    change.restore();
    focus.restore();
  };

  it('should initialize a simple field', function () {
    var fields = {};
    _readField2['default']({}, 'foo', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo,
      name: 'foo',
      value: undefined,
      dirty: false,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
  });

  it('should read a simple field', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        value: 'bar'
      }
    }, 'foo', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo,
      name: 'foo',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
  });

  it('should read a simple field with initial values', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        value: 'bar',
        initial: 'dog'
      }
    }, 'foo', undefined, fields, {}, undefined, false, _extends({}, defaultProps, {
      initialValues: { foo: 'cat' }
    }));
    expectField({
      field: fields.foo,
      name: 'foo',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: 'cat', // should match initialValue prop, not state.initial
      readonly: false
    });
  });

  it('should read a simple field with sync errors', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        value: 'bar'
      }
    }, 'foo', undefined, fields, {
      foo: 'fooError'
    }, undefined, false, defaultProps);
    expectField({
      field: fields.foo,
      name: 'foo',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: 'fooError',
      initialValue: undefined,
      readonly: false
    });
  });

  it('should set checked for boolean value', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        value: true
      }
    }, 'foo', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo,
      name: 'foo',
      value: true,
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false,
      checked: true
    });
    _readField2['default']({
      foo: {
        value: false
      }
    }, 'foo', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo,
      name: 'foo',
      value: false,
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false,
      checked: false
    });
  });

  it('should update simple fields', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        value: 'bar'
      }
    }, 'foo', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo,
      name: 'foo',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
    var beforeField = fields.foo;
    _readField2['default']({
      foo: {
        value: 'dog'
      }
    }, 'foo', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo,
      name: 'foo',
      value: 'dog',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
    var afterField = fields.foo;
    _expect2['default'](beforeField).toNotBe(afterField); // field instance should be different
  });

  it('should initialize a nested field', function () {
    var fields = {};
    _readField2['default']({}, 'foo.baz', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo.baz,
      name: 'foo.baz',
      value: undefined,
      dirty: false,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
  });

  it('should read a nested field', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        baz: {
          value: 'bar'
        }
      }
    }, 'foo.baz', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo.baz,
      name: 'foo.baz',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
  });

  it('should read a nested field with initial value', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        baz: {
          value: 'bar',
          initial: 'dog'
        }
      }
    }, 'foo.baz', undefined, fields, {}, undefined, false, _extends({}, defaultProps, {
      initialValues: {
        foo: {
          baz: 'cat'
        }
      }
    }));
    expectField({
      field: fields.foo.baz,
      name: 'foo.baz',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: 'cat', // should match initialValue prop, not state.initial
      readonly: false
    });
  });

  it('should read a nested field with sync errors', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        baz: {
          value: 'bar'
        }
      }
    }, 'foo.baz', undefined, fields, {
      foo: {
        baz: 'bazError'
      }
    }, undefined, false, defaultProps);
    expectField({
      field: fields.foo.baz,
      name: 'foo.baz',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: 'bazError',
      initialValue: undefined,
      readonly: false
    });
  });

  it('should update a nested field', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        baz: {
          value: 'bar'
        }
      }
    }, 'foo.baz', undefined, fields, {
      foo: {
        baz: 'bazError'
      }
    }, undefined, false, defaultProps);
    expectField({
      field: fields.foo.baz,
      name: 'foo.baz',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: 'bazError',
      initialValue: undefined,
      readonly: false
    });
    var beforeFoo = fields.foo;
    var beforeField = fields.foo.baz;
    _readField2['default']({
      foo: {
        baz: {
          value: 'barNew'
        }
      }
    }, 'foo.baz', undefined, fields, {
      foo: {
        baz: 'bazError'
      }
    }, undefined, false, defaultProps);
    expectField({
      field: fields.foo.baz,
      name: 'foo.baz',
      value: 'barNew',
      dirty: true,
      touched: false,
      visited: false,
      error: 'bazError',
      initialValue: undefined,
      readonly: false
    });
    var afterFoo = fields.foo;
    var afterField = fields.foo.baz;
    _expect2['default'](beforeFoo).toBe(afterFoo); // field container instance should be same
    _expect2['default'](beforeField).toNotBe(afterField); // field instance should be different
  });

  it('should initialize an array field', function () {
    var fields = {};
    _readField2['default']({}, 'foo[]', undefined, fields, {}, undefined, false, defaultProps);
    _expect2['default'](fields.foo).toBeA('array');
    _expect2['default'](fields.foo[0]).toBe(undefined);
  });

  it('should read an array field', function () {
    var fields = {};
    _readField2['default']({
      foo: [{ value: 'bar' }, { value: 'baz' }]
    }, 'foo[]', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo[0],
      name: 'foo[0]',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
    expectField({
      field: fields.foo[1],
      name: 'foo[1]',
      value: 'baz',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
    _expect2['default'](fields.foo[2]).toBe(undefined);
  });

  it('should read an array field with an initial value', function () {
    var fields = {};
    _readField2['default']({
      foo: [{ value: 'bar' }, { value: 'baz' }]
    }, 'foo[]', undefined, fields, {}, undefined, false, _extends({}, defaultProps, {
      initialValues: {
        foo: ['cat1', 'cat2']
      }
    }));
    expectField({
      field: fields.foo[0],
      name: 'foo[0]',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: 'cat1',
      readonly: false
    });
    expectField({
      field: fields.foo[1],
      name: 'foo[1]',
      value: 'baz',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: 'cat2',
      readonly: false
    });
  });

  it('should read an array field with sync errors', function () {
    var fields = {};
    _readField2['default']({
      foo: [{ value: 'bar' }, { value: 'baz' }]
    }, 'foo[]', undefined, fields, {
      foo: ['error1', 'error2']
    }, undefined, false, defaultProps);
    expectField({
      field: fields.foo[0],
      name: 'foo[0]',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: 'error1',
      initialValue: undefined,
      readonly: false
    });
    expectField({
      field: fields.foo[1],
      name: 'foo[1]',
      value: 'baz',
      dirty: true,
      touched: false,
      visited: false,
      error: 'error2',
      initialValue: undefined,
      readonly: false
    });
  });

  it('should update an array field', function () {
    var fields = {};
    _readField2['default']({
      foo: [{ value: 'bar' }, { value: 'baz' }]
    }, 'foo[]', undefined, fields, {
      foo: ['error1', 'error2']
    }, undefined, false, defaultProps);
    expectField({
      field: fields.foo[0],
      name: 'foo[0]',
      value: 'bar',
      dirty: true,
      touched: false,
      visited: false,
      error: 'error1',
      initialValue: undefined,
      readonly: false
    });
    expectField({
      field: fields.foo[1],
      name: 'foo[1]',
      value: 'baz',
      dirty: true,
      touched: false,
      visited: false,
      error: 'error2',
      initialValue: undefined,
      readonly: false
    });
    var beforeArray = fields.foo;
    var before1 = fields.foo[0];
    var before2 = fields.foo[1];
    _readField2['default']({
      foo: [{ value: 'barNew' }, { value: 'bazNew' }]
    }, 'foo[]', undefined, fields, {
      foo: ['error1', 'error2']
    }, undefined, false, defaultProps);
    expectField({
      field: fields.foo[0],
      name: 'foo[0]',
      value: 'barNew',
      dirty: true,
      touched: false,
      visited: false,
      error: 'error1',
      initialValue: undefined,
      readonly: false
    });
    expectField({
      field: fields.foo[1],
      name: 'foo[1]',
      value: 'bazNew',
      dirty: true,
      touched: false,
      visited: false,
      error: 'error2',
      initialValue: undefined,
      readonly: false
    });
    var afterArray = fields.foo;
    var after1 = fields.foo[0];
    var after2 = fields.foo[1];
    _expect2['default'](beforeArray).toBe(afterArray); // array should be same instance
    _expect2['default'](before1).toNotBe(after1); // field instance should be different
    _expect2['default'](before2).toNotBe(after2); // field instance should be different
  });

  it('should allow an array field to add a value', function () {
    var spy = _expect.createSpy();
    var fields = {};
    _readField2['default']({
      foo: [{ value: 'bar' }, { value: 'baz' }]
    }, 'foo[]', undefined, fields, {}, undefined, false, _extends({}, defaultProps, {
      addArrayValue: spy
    }));
    fields.foo.addField('rabbit');
    _expect2['default'](spy).toHaveBeenCalled().toHaveBeenCalledWith('foo', 'rabbit', undefined);
  });

  it('should allow an array field to remove a value', function () {
    var spy = _expect.createSpy();
    var fields = {};
    _readField2['default']({
      foo: [{ value: 'bar' }, { value: 'baz' }]
    }, 'foo[]', undefined, fields, {}, undefined, false, _extends({}, defaultProps, {
      removeArrayValue: spy
    }));
    fields.foo.removeField(1);
    _expect2['default'](spy).toHaveBeenCalled().toHaveBeenCalledWith('foo', 1);
  });

  it('should remove array field when it is no longer in the store', function () {
    var fields = {};
    _readField2['default']({
      foo: [{ value: 'bar' }, { value: 'baz' }]
    }, 'foo[]', undefined, fields, {}, undefined, false, defaultProps);
    _expect2['default'](fields.foo.length).toBe(2);
    _expect2['default'](fields.foo[0].value).toBe('bar');
    _expect2['default'](fields.foo[1].value).toBe('baz');
    _readField2['default']({
      foo: [{ value: 'bar' }]
    }, 'foo[]', undefined, fields, {}, undefined, false, defaultProps);
    _expect2['default'](fields.foo.length).toBe(1);
    _expect2['default'](fields.foo[0].value).toBe('bar');
  });

  it('should initialize a mixed field with empty state', function () {
    var fields = {};
    _readField2['default']({}, 'pig.foo[].dog.cat[].rat', undefined, fields, {}, undefined, false, defaultProps);
    _expect2['default'](fields.pig).toBeA('object');
    _expect2['default'](fields.pig.foo).toBeA('array');
    _expect2['default'](fields.pig.foo[0]).toBe(undefined);
  });

  it('should read a mixed field', function () {
    var fields = {};
    _readField2['default']({
      pig: {
        foo: [{
          dog: {
            cat: [{
              rat: {
                value: 'hello' // that's deep, baby!
              }
            }]
          }
        }]
      }
    }, 'pig.foo[].dog.cat[].rat', undefined, fields, {}, undefined, false, defaultProps);
    _expect2['default'](fields.pig).toBeA('object');
    _expect2['default'](fields.pig.foo).toBeA('array');
    _expect2['default'](fields.pig.foo[0].dog).toBeA('object');
    _expect2['default'](fields.pig.foo[0].dog.cat).toBeA('array');
    _expect2['default'](fields.pig.foo[0].dog.cat[0]).toBeA('object');
    _expect2['default'](fields.pig.foo[0].dog.cat[0].rat).toBeA('object');
    expectField({
      field: fields.pig.foo[0].dog.cat[0].rat,
      name: 'pig.foo[0].dog.cat[0].rat',
      value: 'hello',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
  });

  it('should read an array field with an initial value', function () {
    var fields = {};
    _readField2['default']({
      pig: {
        foo: [{
          dog: {
            cat: [{
              rat: {
                value: 'hello'
              }
            }]
          }
        }]
      }
    }, 'pig.foo[].dog.cat[].rat', undefined, fields, {}, undefined, false, _extends({}, defaultProps, {
      initialValues: {
        pig: {
          foo: [{
            dog: {
              cat: [{ rat: 'initVal' }]
            }
          }]
        }
      }
    }));
    expectField({
      field: fields.pig.foo[0].dog.cat[0].rat,
      name: 'pig.foo[0].dog.cat[0].rat',
      value: 'hello',
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: 'initVal',
      readonly: false
    });
  });

  it('should read a mixed field with sync errors', function () {
    var fields = {};
    _readField2['default']({
      pig: {
        foo: [{
          dog: {
            cat: [{
              rat: {
                value: 'hello'
              }
            }]
          }
        }]
      }
    }, 'pig.foo[].dog.cat[].rat', undefined, fields, {
      pig: {
        foo: [{
          dog: {
            cat: [{ rat: 'syncError' }]
          }
        }]
      }
    }, undefined, false, defaultProps);
    expectField({
      field: fields.pig.foo[0].dog.cat[0].rat,
      name: 'pig.foo[0].dog.cat[0].rat',
      value: 'hello',
      dirty: true,
      touched: false,
      visited: false,
      error: 'syncError',
      initialValue: undefined,
      readonly: false
    });
  });

  it('should allow an array value', function () {
    var fields = {};
    _readField2['default']({
      foo: {
        value: [1, 2]
      }
    }, 'foo', undefined, fields, {}, undefined, false, defaultProps);
    expectField({
      field: fields.foo,
      name: 'foo',
      value: [1, 2],
      dirty: true,
      touched: false,
      visited: false,
      error: undefined,
      initialValue: undefined,
      readonly: false
    });
  });

  it('should not provide mutators when readonly', function () {
    var fields = {};
    _readField2['default']({}, 'foo', undefined, fields, {}, undefined, false, _extends({}, defaultProps, {
      readonly: true
    }));
    var field = fields.foo;
    _expect2['default'](field.onBlur).toNotExist();
    _expect2['default'](field.onChange).toNotExist();
    _expect2['default'](field.onDragStart).toNotExist();
    _expect2['default'](field.onDrop).toNotExist();
    _expect2['default'](field.onFocus).toNotExist();
    _expect2['default'](field.onUpdate).toNotExist();
  });
});