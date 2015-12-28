'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _bindActionData = require('../bindActionData');

var _bindActionData2 = _interopRequireDefault(_bindActionData);

var _actions = require('../actions');

describe('reducer', function () {
  it('should initialize state to {}', function () {
    var state = _reducer2['default']();
    _expect2['default'](state).toExist().toBeA('object');
    _expect2['default'](Object.keys(state).length).toBe(0);
  });

  it('should not modify state when action has no form', function () {
    var state = { foo: 'bar' };
    _expect2['default'](_reducer2['default'](state, { type: 'SOMETHING_ELSE' })).toBe(state);
  });

  it('should initialize form state when action has form', function () {
    var _expect$toExist$toBeA$toEqual;

    var state = _reducer2['default'](undefined, { form: 'foo' });
    _expect2['default'](state).toExist().toBeA('object');
    _expect2['default'](Object.keys(state).length).toBe(1);
    _expect2['default'](state.foo).toExist().toBeA('object').toEqual((_expect$toExist$toBeA$toEqual = {
      _active: undefined,
      _asyncValidating: false
    }, _expect$toExist$toBeA$toEqual[_reducer.globalErrorKey] = undefined, _expect$toExist$toBeA$toEqual._submitting = false, _expect$toExist$toBeA$toEqual._submitFailed = false, _expect$toExist$toBeA$toEqual));
  });

  it('should add an empty array value with empty state', function () {
    var _expect$toEqual;

    var state = _reducer2['default']({}, _extends({}, _actions.addArrayValue('myField'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual = {
      myField: [{
        value: undefined
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual[_reducer.globalErrorKey] = undefined, _expect$toEqual._submitting = false, _expect$toEqual._submitFailed = false, _expect$toEqual));
  });

  it('should add an empty deep array value with empty state', function () {
    var _expect$toEqual2;

    var state = _reducer2['default']({}, _extends({}, _actions.addArrayValue('myField.myArray'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual2 = {
      myField: {
        myArray: [{
          value: undefined
        }]
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual2[_reducer.globalErrorKey] = undefined, _expect$toEqual2._submitting = false, _expect$toEqual2._submitFailed = false, _expect$toEqual2));
  });

  it('should add a deep array value with initial value', function () {
    var _expect$toEqual3;

    var state = _reducer2['default']({}, _extends({}, _actions.addArrayValue('myField.myArray', 20, undefined), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual3 = {
      myField: {
        myArray: [{
          value: 20
        }]
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual3[_reducer.globalErrorKey] = undefined, _expect$toEqual3._submitting = false, _expect$toEqual3._submitFailed = false, _expect$toEqual3));
  });

  it('should push an array value', function () {
    var _testForm, _expect$toEqual4;

    var state = _reducer2['default']({
      testForm: (_testForm = {
        myField: [{
          value: 'foo'
        }, {
          value: 'bar'
        }],
        _active: undefined,
        _asyncValidating: false
      }, _testForm[_reducer.globalErrorKey] = undefined, _testForm._submitting = false, _testForm._submitFailed = false, _testForm)
    }, _extends({}, _actions.addArrayValue('myField', 'baz'), {
      form: 'testForm'
    }));
    _expect2['default'](state.testForm).toEqual((_expect$toEqual4 = {
      myField: [{
        value: 'foo'
      }, {
        value: 'bar'
      }, {
        value: 'baz'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual4[_reducer.globalErrorKey] = undefined, _expect$toEqual4._submitting = false, _expect$toEqual4._submitFailed = false, _expect$toEqual4));
  });

  it('should insert an array value', function () {
    var _testForm2, _expect$toEqual5;

    var state = _reducer2['default']({
      testForm: (_testForm2 = {
        myField: [{
          value: 'foo'
        }, {
          value: 'bar'
        }],
        _active: undefined,
        _asyncValidating: false
      }, _testForm2[_reducer.globalErrorKey] = undefined, _testForm2._submitting = false, _testForm2._submitFailed = false, _testForm2)
    }, _extends({}, _actions.addArrayValue('myField', 'baz', 1), {
      form: 'testForm'
    }));
    _expect2['default'](state.testForm).toEqual((_expect$toEqual5 = {
      myField: [{
        value: 'foo'
      }, {
        value: 'baz'
      }, {
        value: 'bar'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual5[_reducer.globalErrorKey] = undefined, _expect$toEqual5._submitting = false, _expect$toEqual5._submitFailed = false, _expect$toEqual5));
  });

  // TODO: Find a way to make this pass:
  /*
  it('should push an array value which is a deep object', () => {
    const state = reducer({
      testForm: {
        friends: [
          {
            name: {
              initial: 'name-1',
              value: 'name-1'
            },
            address: {
              street: {
                initial: 'street-1',
                value: 'street-1'
              },
              postalCode: {
                initial: 'postalCode-1',
                value: 'postalCode-1'
              }
            }
          },
          {
            name: {
              initial: 'name-2',
              value: 'name-2'
            },
            address: {
              street: {
                initial: 'street-2',
                value: 'street-2'
              },
              postalCode: {
                initial: 'postalCode-2',
                value: 'postalCode-2'
              }
            }
          }
        ],
        _active: undefined,
        _asyncValidating: false,
        _error: undefined,
        _submitting: false,
        _submitFailed: false
      }
    }, {
      ...addArrayValue('friends', {
        name: 'name-3',
        address: {
          street: 'street-3',
          postalCode: 'postalCode-3'
        }
      }, undefined),
      form: 'testForm'
    });
    expect(state.testForm)
      .toEqual({
        friends: [
          {
            name: {
              initial: 'name-1',
              value: 'name-1'
            },
            address: {
              street: {
                initial: 'street-1',
                value: 'street-1'
              },
              postalCode: {
                initial: 'postalCode-1',
                value: 'postalCode-1'
              }
            }
          },
          {
            name: {
              initial: 'name-2',
              value: 'name-2'
            },
            address: {
              street: {
                initial: 'street-2',
                value: 'street-2'
              },
              postalCode: {
                initial: 'postalCode-2',
                value: 'postalCode-2'
              }
            }
          },
          {
            name: {
              initial: 'name-3',
              value: 'name-3'
            },
            address: {
              street: {
                initial: 'street-3',
                value: 'street-3'
              },
              postalCode: {
                initial: 'postalCode-3',
                value: 'postalCode-3'
              }
            }
          }
        ],
        _active: undefined,
        _asyncValidating: false,
        _error: undefined,
        _submitting: false,
        _submitFailed: false
      });
  });
  */

  it('should push a deep array value which is a nested object', function () {
    var state = _reducer2['default']({
      testForm: {
        myField: [{
          foo: {
            initial: { a: 'foo-a1', b: 'foo-b1' },
            value: { a: 'foo-a1', b: 'foo-b1' }
          },
          bar: {
            initial: { a: 'bar-a1', b: 'bar-b1' },
            value: { a: 'bar-a1', b: 'bar-b1' }
          }
        }, {
          foo: {
            initial: { a: 'foo-a2', b: 'foo-b2' },
            value: { a: 'foo-a2', b: 'foo-b2' }
          },
          bar: {
            initial: { a: 'bar-a2', b: 'bar-b2' },
            value: { a: 'bar-a2', b: 'bar-b2' }
          }
        }],
        _active: undefined,
        _asyncValidating: false,
        _error: undefined,
        _submitting: false,
        _submitFailed: false
      }
    }, _extends({}, _actions.addArrayValue('myField', { foo: { a: 'foo-a3', b: 'foo-b3' }, bar: { a: 'bar-a3', b: 'bar-b3' } }, undefined), {
      form: 'testForm'
    }));
    _expect2['default'](state.testForm).toEqual({
      myField: [{
        foo: {
          initial: { a: 'foo-a1', b: 'foo-b1' },
          value: { a: 'foo-a1', b: 'foo-b1' }
        },
        bar: {
          initial: { a: 'bar-a1', b: 'bar-b1' },
          value: { a: 'bar-a1', b: 'bar-b1' }
        }
      }, {
        foo: {
          initial: { a: 'foo-a2', b: 'foo-b2' },
          value: { a: 'foo-a2', b: 'foo-b2' }
        },
        bar: {
          initial: { a: 'bar-a2', b: 'bar-b2' },
          value: { a: 'bar-a2', b: 'bar-b2' }
        }
      }, {
        foo: {
          initial: { a: 'foo-a3', b: 'foo-b3' },
          value: { a: 'foo-a3', b: 'foo-b3' }
        },
        bar: {
          initial: { a: 'bar-a3', b: 'bar-b3' },
          value: { a: 'bar-a3', b: 'bar-b3' }
        }
      }],
      _active: undefined,
      _asyncValidating: false,
      _error: undefined,
      _submitting: false,
      _submitFailed: false
    });
  });

  it('should push a subarray value which is an object', function () {
    var state = _reducer2['default']({
      testForm: {
        myField: [{
          myField2: [{
            foo: {
              initial: 'foo-1-1',
              value: 'foo-1-1'
            },
            bar: {
              initial: 'bar-1-1',
              value: 'bar-1-1'
            }
          }, {
            foo: {
              initial: 'foo-1-2',
              value: 'foo-1-2'
            },
            bar: {
              initial: 'bar-1-2',
              value: 'bar-1-2'
            }
          }]
        }, {
          myField2: [{
            foo: {
              initial: 'foo-2-1',
              value: 'foo-2-1'
            },
            bar: {
              initial: 'bar-2-1',
              value: 'bar-2-1'
            }
          }, {
            foo: {
              initial: 'foo-2-2',
              value: 'foo-2-2'
            },
            bar: {
              initial: 'bar-2-2',
              value: 'bar-2-2'
            }
          }]
        }],
        _active: undefined,
        _asyncValidating: false,
        _error: undefined,
        _submitting: false,
        _submitFailed: false
      }
    }, _extends({}, _actions.addArrayValue('myField[1].myField2', { foo: 'foo-2-3', bar: 'bar-2-3' }, undefined), {
      form: 'testForm'
    }));
    _expect2['default'](state.testForm).toEqual({
      myField: [{
        myField2: [{
          foo: {
            initial: 'foo-1-1',
            value: 'foo-1-1'
          },
          bar: {
            initial: 'bar-1-1',
            value: 'bar-1-1'
          }
        }, {
          foo: {
            initial: 'foo-1-2',
            value: 'foo-1-2'
          },
          bar: {
            initial: 'bar-1-2',
            value: 'bar-1-2'
          }
        }]
      }, {
        myField2: [{
          foo: {
            initial: 'foo-2-1',
            value: 'foo-2-1'
          },
          bar: {
            initial: 'bar-2-1',
            value: 'bar-2-1'
          }
        }, {
          foo: {
            initial: 'foo-2-2',
            value: 'foo-2-2'
          },
          bar: {
            initial: 'bar-2-2',
            value: 'bar-2-2'
          }
        }, {
          foo: {
            initial: 'foo-2-3',
            value: 'foo-2-3'
          },
          bar: {
            initial: 'bar-2-3',
            value: 'bar-2-3'
          }
        }]
      }],
      _active: undefined,
      _asyncValidating: false,
      _error: undefined,
      _submitting: false,
      _submitFailed: false
    });
  });

  it('should set value on blur with empty state', function () {
    var _expect$toEqual6;

    var state = _reducer2['default']({}, _extends({}, _actions.blur('myField', 'myValue'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual6 = {
      myField: {
        value: 'myValue'
      },
      _asyncValidating: false
    }, _expect$toEqual6[_reducer.globalErrorKey] = undefined, _expect$toEqual6._submitting = false, _expect$toEqual6._submitFailed = false, _expect$toEqual6));
  });

  it('should set value on blur and touch with empty state', function () {
    var _expect$toEqual7;

    var state = _reducer2['default']({}, _extends({}, _actions.blur('myField', 'myValue'), {
      form: 'foo',
      touch: true
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual7 = {
      myField: {
        value: 'myValue',
        touched: true
      },
      _asyncValidating: false
    }, _expect$toEqual7[_reducer.globalErrorKey] = undefined, _expect$toEqual7._submitting = false, _expect$toEqual7._submitFailed = false, _expect$toEqual7));
  });

  it('should set value on blur and touch with initial value', function () {
    var _foo, _expect$toEqual8;

    var state = _reducer2['default']({
      foo: (_foo = {
        myField: {
          initial: 'initialValue',
          value: 'initialValue',
          touched: false
        },
        _asyncValidating: false
      }, _foo[_reducer.globalErrorKey] = undefined, _foo._submitting = false, _foo._submitFailed = false, _foo)
    }, _extends({}, _actions.blur('myField', 'myValue'), {
      form: 'foo',
      touch: true
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual8 = {
      myField: {
        initial: 'initialValue',
        value: 'myValue',
        touched: true
      },
      _asyncValidating: false
    }, _expect$toEqual8[_reducer.globalErrorKey] = undefined, _expect$toEqual8._submitting = false, _expect$toEqual8._submitFailed = false, _expect$toEqual8));
  });

  it('should not modify value if undefined is passed on blur (for android react native)', function () {
    var _foo2, _expect$toEqual9;

    var state = _reducer2['default']({
      foo: (_foo2 = {
        myField: {
          initial: 'initialValue',
          value: 'myValue',
          touched: false
        },
        _active: 'myField',
        _asyncValidating: false
      }, _foo2[_reducer.globalErrorKey] = undefined, _foo2._submitting = false, _foo2._submitFailed = false, _foo2)
    }, _extends({}, _actions.blur('myField'), {
      form: 'foo',
      touch: true
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual9 = {
      myField: {
        initial: 'initialValue',
        value: 'myValue',
        touched: true
      },
      _asyncValidating: false
    }, _expect$toEqual9[_reducer.globalErrorKey] = undefined, _expect$toEqual9._submitting = false, _expect$toEqual9._submitFailed = false, _expect$toEqual9));
  });

  it('should not modify value if undefined is passed on blur, even if no value existed (for android react native)', function () {
    var _foo3, _expect$toEqual10;

    var state = _reducer2['default']({
      foo: (_foo3 = {
        myField: {
          value: undefined
        },
        _active: 'myField',
        _asyncValidating: false
      }, _foo3[_reducer.globalErrorKey] = undefined, _foo3._submitting = false, _foo3._submitFailed = false, _foo3)
    }, _extends({}, _actions.blur('myField'), {
      form: 'foo',
      touch: true
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual10 = {
      myField: {
        value: undefined,
        touched: true
      },
      _asyncValidating: false
    }, _expect$toEqual10[_reducer.globalErrorKey] = undefined, _expect$toEqual10._submitting = false, _expect$toEqual10._submitFailed = false, _expect$toEqual10));
  });

  it('should set nested value on blur', function () {
    var _foo4, _expect$toEqual11;

    var state = _reducer2['default']({
      foo: (_foo4 = {
        myField: {
          mySubField: {
            value: undefined
          }
        },
        _active: 'myField',
        _asyncValidating: false
      }, _foo4[_reducer.globalErrorKey] = undefined, _foo4._submitting = false, _foo4._submitFailed = false, _foo4)
    }, _extends({}, _actions.blur('myField.mySubField', 'hello'), {
      form: 'foo',
      touch: true
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual11 = {
      myField: {
        mySubField: {
          value: 'hello',
          touched: true
        }
      },
      _asyncValidating: false
    }, _expect$toEqual11[_reducer.globalErrorKey] = undefined, _expect$toEqual11._submitting = false, _expect$toEqual11._submitFailed = false, _expect$toEqual11));
  });

  it('should set array value on blur', function () {
    var _foo5, _expect$toEqual12;

    var state = _reducer2['default']({
      foo: (_foo5 = {
        myArray: [{ value: undefined }],
        _active: 'myField',
        _asyncValidating: false
      }, _foo5[_reducer.globalErrorKey] = undefined, _foo5._submitting = false, _foo5._submitFailed = false, _foo5)
    }, _extends({}, _actions.blur('myArray[0]', 'hello'), {
      form: 'foo',
      touch: true
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual12 = {
      myArray: [{
        value: 'hello',
        touched: true
      }],
      _asyncValidating: false
    }, _expect$toEqual12[_reducer.globalErrorKey] = undefined, _expect$toEqual12._submitting = false, _expect$toEqual12._submitFailed = false, _expect$toEqual12));
  });

  it('should set value on change with empty state', function () {
    var _expect$toEqual13;

    var state = _reducer2['default']({}, _extends({}, _actions.change('myField', 'myValue'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual13 = {
      myField: {
        value: 'myValue'
      },
      _active: undefined, // CHANGE doesn't touch _active
      _asyncValidating: false
    }, _expect$toEqual13[_reducer.globalErrorKey] = undefined, _expect$toEqual13._submitting = false, _expect$toEqual13._submitFailed = false, _expect$toEqual13));
  });

  it('should set value on change and touch with empty state', function () {
    var _expect$toEqual14;

    var state = _reducer2['default']({}, _extends({}, _actions.change('myField', 'myValue'), {
      form: 'foo',
      touch: true
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual14 = {
      myField: {
        value: 'myValue',
        touched: true
      },
      _active: undefined, // CHANGE doesn't touch _active
      _asyncValidating: false
    }, _expect$toEqual14[_reducer.globalErrorKey] = undefined, _expect$toEqual14._submitting = false, _expect$toEqual14._submitFailed = false, _expect$toEqual14));
  });

  it('should set value on change and touch with initial value', function () {
    var _foo6, _expect$toEqual15;

    var state = _reducer2['default']({
      foo: (_foo6 = {
        myField: {
          initial: 'initialValue',
          value: 'initialValue',
          touched: false
        },
        _active: 'myField',
        _asyncValidating: false
      }, _foo6[_reducer.globalErrorKey] = 'Some global error', _foo6._submitting = false, _foo6._submitFailed = false, _foo6)
    }, _extends({}, _actions.change('myField', 'myValue'), {
      form: 'foo',
      touch: true
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual15 = {
      myField: {
        initial: 'initialValue',
        value: 'myValue',
        touched: true
      },
      _active: 'myField',
      _asyncValidating: false
    }, _expect$toEqual15[_reducer.globalErrorKey] = 'Some global error', _expect$toEqual15._submitting = false, _expect$toEqual15._submitFailed = false, _expect$toEqual15));
  });

  it('should set value on change and remove field-level submit and async errors', function () {
    var _foo7, _expect$toEqual16;

    var state = _reducer2['default']({
      foo: (_foo7 = {
        myField: {
          value: 'initial',
          submitError: 'submit error',
          asyncError: 'async error'
        },
        _active: 'myField',
        _asyncValidating: false
      }, _foo7[_reducer.globalErrorKey] = 'Some global error', _foo7._submitting = false, _foo7._submitFailed = false, _foo7)
    }, _extends({}, _actions.change('myField', 'different'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual16 = {
      myField: {
        value: 'different'
      },
      _active: 'myField',
      _asyncValidating: false
    }, _expect$toEqual16[_reducer.globalErrorKey] = 'Some global error', _expect$toEqual16._submitting = false, _expect$toEqual16._submitFailed = false, _expect$toEqual16));
  });

  it('should set nested value on change with empty state', function () {
    var _expect$toEqual17;

    var state = _reducer2['default']({}, _extends({}, _actions.change('myField.mySubField', 'myValue'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual17 = {
      myField: {
        mySubField: {
          value: 'myValue'
        }
      },
      _active: undefined, // CHANGE doesn't touch _active
      _asyncValidating: false
    }, _expect$toEqual17[_reducer.globalErrorKey] = undefined, _expect$toEqual17._submitting = false, _expect$toEqual17._submitFailed = false, _expect$toEqual17));
  });

  it('should set visited on focus and update active with no previous state', function () {
    var _expect$toEqual18;

    var state = _reducer2['default']({}, _extends({}, _actions.focus('myField'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual18 = {
      myField: {
        visited: true
      },
      _active: 'myField',
      _asyncValidating: false
    }, _expect$toEqual18[_reducer.globalErrorKey] = undefined, _expect$toEqual18._submitting = false, _expect$toEqual18._submitFailed = false, _expect$toEqual18));
  });

  it('should set visited on focus and update active on deep field with no previous state', function () {
    var _expect$toEqual19;

    var state = _reducer2['default']({}, _extends({}, _actions.focus('myField.subField'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual19 = {
      myField: {
        subField: {
          visited: true
        }
      },
      _active: 'myField.subField',
      _asyncValidating: false
    }, _expect$toEqual19[_reducer.globalErrorKey] = undefined, _expect$toEqual19._submitting = false, _expect$toEqual19._submitFailed = false, _expect$toEqual19));
  });

  it('should set visited on focus and update current with previous state', function () {
    var _foo8, _expect$toEqual20;

    var state = _reducer2['default']({
      foo: (_foo8 = {
        myField: {
          initial: 'initialValue',
          value: 'initialValue',
          visited: false
        },
        _active: 'otherField',
        _asyncValidating: false
      }, _foo8[_reducer.globalErrorKey] = undefined, _foo8._submitting = false, _foo8._submitFailed = false, _foo8)
    }, _extends({}, _actions.focus('myField'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual20 = {
      myField: {
        initial: 'initialValue',
        value: 'initialValue',
        visited: true
      },
      _active: 'myField',
      _asyncValidating: false
    }, _expect$toEqual20[_reducer.globalErrorKey] = undefined, _expect$toEqual20._submitting = false, _expect$toEqual20._submitFailed = false, _expect$toEqual20));
  });

  it('should set initialize values on initialize on empty state', function () {
    var _expect$toEqual21;

    var state = _reducer2['default']({}, _extends({}, _actions.initialize({ myField: 'initialValue' }, ['myField']), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual21 = {
      myField: {
        initial: 'initialValue',
        value: 'initialValue'
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual21[_reducer.globalErrorKey] = undefined, _expect$toEqual21._submitting = false, _expect$toEqual21._submitFailed = false, _expect$toEqual21));
  });

  it('should allow initializing null values', function () {
    var _expect$toEqual22;

    var state = _reducer2['default']({}, _extends({}, _actions.initialize({ bar: 'baz', dog: null }, ['bar', 'dog']), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual22 = {
      bar: {
        initial: 'baz',
        value: 'baz'
      },
      dog: {
        initial: null,
        value: null
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual22[_reducer.globalErrorKey] = undefined, _expect$toEqual22._submitting = false, _expect$toEqual22._submitFailed = false, _expect$toEqual22));
  });

  it('should initialize nested values on initialize on empty state', function () {
    var _expect$toEqual23;

    var state = _reducer2['default']({}, _extends({}, _actions.initialize({ myField: { subField: 'initialValue' } }, ['myField.subField'], {}), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual23 = {
      myField: {
        subField: {
          initial: 'initialValue',
          value: 'initialValue'
        }
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual23[_reducer.globalErrorKey] = undefined, _expect$toEqual23._submitting = false, _expect$toEqual23._submitFailed = false, _expect$toEqual23));
  });

  it('should initialize array values on initialize on empty state', function () {
    var _expect$toEqual24;

    var state = _reducer2['default']({}, _extends({}, _actions.initialize({ myField: ['initialValue'] }, ['myField[]'], {}), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual24 = {
      myField: [{
        initial: 'initialValue',
        value: 'initialValue'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual24[_reducer.globalErrorKey] = undefined, _expect$toEqual24._submitting = false, _expect$toEqual24._submitFailed = false, _expect$toEqual24));
  });

  it('should initialize array values with subvalues on initialize on empty state', function () {
    var _expect$toEqual25;

    var state = _reducer2['default']({}, _extends({}, _actions.initialize({
      accounts: [{
        name: 'Bobby Tables',
        email: 'bobby@gmail.com'
      }, {
        name: 'Sammy Tables',
        email: 'sammy@gmail.com'
      }]
    }, ['accounts[].name', 'accounts[].email'], {}), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual25 = {
      accounts: [{
        name: {
          initial: 'Bobby Tables',
          value: 'Bobby Tables'
        },
        email: {
          initial: 'bobby@gmail.com',
          value: 'bobby@gmail.com'
        }
      }, {
        name: {
          initial: 'Sammy Tables',
          value: 'Sammy Tables'
        },
        email: {
          initial: 'sammy@gmail.com',
          value: 'sammy@gmail.com'
        }
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual25[_reducer.globalErrorKey] = undefined, _expect$toEqual25._submitting = false, _expect$toEqual25._submitFailed = false, _expect$toEqual25));
  });

  it('should set initialize values, but not change dirty value when initializing', function () {
    var _foo9, _expect$toEqual26;

    var state = _reducer2['default']({
      foo: (_foo9 = {
        myField: {
          value: 'dirtyValue',
          touched: true
        },
        _active: 'myField',
        _asyncValidating: false
      }, _foo9[_reducer.globalErrorKey] = undefined, _foo9._submitting = false, _foo9._submitFailed = false, _foo9)
    }, _extends({}, _actions.initialize({ myField: 'initialValue' }, ['myField']), {
      form: 'foo',
      touch: true
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual26 = {
      myField: {
        initial: 'initialValue',
        value: 'dirtyValue'
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual26[_reducer.globalErrorKey] = undefined, _expect$toEqual26._submitting = false, _expect$toEqual26._submitFailed = false, _expect$toEqual26));
  });

  it('should pop an array value', function () {
    var _testForm3, _expect$toEqual27;

    var state = _reducer2['default']({
      testForm: (_testForm3 = {
        myField: [{
          value: 'foo'
        }, {
          value: 'bar'
        }],
        _active: undefined,
        _asyncValidating: false
      }, _testForm3[_reducer.globalErrorKey] = undefined, _testForm3._submitting = false, _testForm3._submitFailed = false, _testForm3)
    }, _extends({}, _actions.removeArrayValue('myField'), {
      form: 'testForm'
    }));
    _expect2['default'](state.testForm).toEqual((_expect$toEqual27 = {
      myField: [{
        value: 'foo'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual27[_reducer.globalErrorKey] = undefined, _expect$toEqual27._submitting = false, _expect$toEqual27._submitFailed = false, _expect$toEqual27));
  });

  it('should not change empty array value on remove', function () {
    var _testForm4, _expect$toEqual28;

    var state = _reducer2['default']({
      testForm: (_testForm4 = {
        myField: [],
        _active: undefined,
        _asyncValidating: false
      }, _testForm4[_reducer.globalErrorKey] = undefined, _testForm4._submitting = false, _testForm4._submitFailed = false, _testForm4)
    }, _extends({}, _actions.removeArrayValue('myField'), {
      form: 'testForm'
    }));
    _expect2['default'](state.testForm).toEqual((_expect$toEqual28 = {
      myField: [],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual28[_reducer.globalErrorKey] = undefined, _expect$toEqual28._submitting = false, _expect$toEqual28._submitFailed = false, _expect$toEqual28));
  });

  it('should remove an array value from start of array', function () {
    var _testForm5, _expect$toEqual29;

    var state = _reducer2['default']({
      testForm: (_testForm5 = {
        myField: [{
          value: 'foo'
        }, {
          value: 'bar'
        }, {
          value: 'baz'
        }],
        _active: undefined,
        _asyncValidating: false
      }, _testForm5[_reducer.globalErrorKey] = undefined, _testForm5._submitting = false, _testForm5._submitFailed = false, _testForm5)
    }, _extends({}, _actions.removeArrayValue('myField', 0), {
      form: 'testForm'
    }));
    _expect2['default'](state.testForm).toEqual((_expect$toEqual29 = {
      myField: [{
        value: 'bar'
      }, {
        value: 'baz'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual29[_reducer.globalErrorKey] = undefined, _expect$toEqual29._submitting = false, _expect$toEqual29._submitFailed = false, _expect$toEqual29));
  });

  it('should remove an array value from middle of array', function () {
    var _testForm6, _expect$toEqual30;

    var state = _reducer2['default']({
      testForm: (_testForm6 = {
        myField: [{
          value: 'foo'
        }, {
          value: 'bar'
        }, {
          value: 'baz'
        }],
        _active: undefined,
        _asyncValidating: false
      }, _testForm6[_reducer.globalErrorKey] = undefined, _testForm6._submitting = false, _testForm6._submitFailed = false, _testForm6)
    }, _extends({}, _actions.removeArrayValue('myField', 1), {
      form: 'testForm'
    }));
    _expect2['default'](state.testForm).toEqual((_expect$toEqual30 = {
      myField: [{
        value: 'foo'
      }, {
        value: 'baz'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual30[_reducer.globalErrorKey] = undefined, _expect$toEqual30._submitting = false, _expect$toEqual30._submitFailed = false, _expect$toEqual30));
  });

  it('should reset values on reset on with previous state', function () {
    var _foo10, _expect$toEqual31;

    var state = _reducer2['default']({
      foo: (_foo10 = {
        myField: {
          initial: 'initialValue',
          value: 'dirtyValue',
          touched: true
        },
        myOtherField: {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          touched: true
        },
        _active: 'myField',
        _asyncValidating: false
      }, _foo10[_reducer.globalErrorKey] = undefined, _foo10._submitting = false, _foo10._submitFailed = false, _foo10)
    }, _extends({}, _actions.reset(), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual31 = {
      myField: {
        initial: 'initialValue',
        value: 'initialValue'
      },
      myOtherField: {
        initial: 'otherInitialValue',
        value: 'otherInitialValue'
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual31[_reducer.globalErrorKey] = undefined, _expect$toEqual31._submitting = false, _expect$toEqual31._submitFailed = false, _expect$toEqual31));
  });

  it('should reset deep values on reset on with previous state', function () {
    var _foo11, _expect$toEqual32;

    var state = _reducer2['default']({
      foo: (_foo11 = {
        subField: {
          myField: {
            initial: 'initialValue',
            value: 'dirtyValue',
            touched: true
          },
          myOtherField: {
            initial: 'otherInitialValue',
            value: 'otherDirtyValue',
            touched: true
          }
        },
        _active: 'myField',
        _asyncValidating: false
      }, _foo11[_reducer.globalErrorKey] = undefined, _foo11._submitting = false, _foo11._submitFailed = false, _foo11)
    }, _extends({}, _actions.reset(), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual32 = {
      subField: {
        myField: {
          initial: 'initialValue',
          value: 'initialValue'
        },
        myOtherField: {
          initial: 'otherInitialValue',
          value: 'otherInitialValue'
        }
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual32[_reducer.globalErrorKey] = undefined, _expect$toEqual32._submitting = false, _expect$toEqual32._submitFailed = false, _expect$toEqual32));
  });

  it('should set asyncValidating on startAsyncValidation', function () {
    var _foo12, _expect$toEqual33;

    var state = _reducer2['default']({
      foo: (_foo12 = {
        doesnt: 'matter',
        should: 'notchange',
        _active: undefined,
        _asyncValidating: false
      }, _foo12[_reducer.globalErrorKey] = undefined, _foo12._submitting = false, _foo12._submitFailed = false, _foo12)
    }, _extends({}, _actions.startAsyncValidation(), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual33 = {
      doesnt: 'matter',
      should: 'notchange',
      _active: undefined,
      _asyncValidating: true
    }, _expect$toEqual33[_reducer.globalErrorKey] = undefined, _expect$toEqual33._submitting = false, _expect$toEqual33._submitFailed = false, _expect$toEqual33));
  });

  it('should set submitting on startSubmit', function () {
    var _foo13, _expect$toEqual34;

    var state = _reducer2['default']({
      foo: (_foo13 = {
        doesnt: 'matter',
        should: 'notchange',
        _active: undefined,
        _asyncValidating: false
      }, _foo13[_reducer.globalErrorKey] = undefined, _foo13._submitting = false, _foo13._submitFailed = false, _foo13)
    }, _extends({}, _actions.startSubmit(), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual34 = {
      doesnt: 'matter',
      should: 'notchange',
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual34[_reducer.globalErrorKey] = undefined, _expect$toEqual34._submitting = true, _expect$toEqual34._submitFailed = false, _expect$toEqual34));
  });

  it('should set submitting on startSubmit, and NOT reset submitFailed', function () {
    var _foo14, _expect$toEqual35;

    var state = _reducer2['default']({
      foo: (_foo14 = {
        doesnt: 'matter',
        should: 'notchange',
        _active: undefined,
        _asyncValidating: false
      }, _foo14[_reducer.globalErrorKey] = undefined, _foo14._submitting = false, _foo14._submitFailed = true, _foo14)
    }, _extends({}, _actions.startSubmit(), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual35 = {
      doesnt: 'matter',
      should: 'notchange',
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual35[_reducer.globalErrorKey] = undefined, _expect$toEqual35._submitting = true, _expect$toEqual35._submitFailed = true, _expect$toEqual35));
  });

  it('should set asyncError on nested fields on stopAsyncValidation', function () {
    var _foo15, _expect$toEqual36;

    var state = _reducer2['default']({
      foo: (_foo15 = {
        bar: {
          myField: {
            initial: 'initialValue',
            value: 'dirtyValue',
            touched: true
          },
          myOtherField: {
            initial: 'otherInitialValue',
            value: 'otherDirtyValue',
            touched: true
          }
        },
        _active: undefined,
        _asyncValidating: true
      }, _foo15[_reducer.globalErrorKey] = undefined, _foo15._submitting = false, _foo15._submitFailed = false, _foo15)
    }, _extends({}, _actions.stopAsyncValidation({
      bar: {
        myField: 'Error about myField',
        myOtherField: 'Error about myOtherField'
      }
    }), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual36 = {
      bar: {
        myField: {
          initial: 'initialValue',
          value: 'dirtyValue',
          touched: true,
          asyncError: 'Error about myField'
        },
        myOtherField: {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          touched: true,
          asyncError: 'Error about myOtherField'
        }
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual36[_reducer.globalErrorKey] = undefined, _expect$toEqual36._submitting = false, _expect$toEqual36._submitFailed = false, _expect$toEqual36));
  });

  it('should set asyncError on array fields on stopAsyncValidation', function () {
    var _foo16, _expect$toEqual37;

    var state = _reducer2['default']({
      foo: (_foo16 = {
        bar: [{
          initial: 'initialValue',
          value: 'dirtyValue',
          touched: true
        }, {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          touched: true
        }],
        _active: undefined,
        _asyncValidating: true
      }, _foo16[_reducer.globalErrorKey] = undefined, _foo16._submitting = false, _foo16._submitFailed = false, _foo16)
    }, _extends({}, _actions.stopAsyncValidation({
      bar: ['Error about myField', 'Error about myOtherField']
    }), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual37 = {
      bar: [{
        initial: 'initialValue',
        value: 'dirtyValue',
        touched: true,
        asyncError: 'Error about myField'
      }, {
        initial: 'otherInitialValue',
        value: 'otherDirtyValue',
        touched: true,
        asyncError: 'Error about myOtherField'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual37[_reducer.globalErrorKey] = undefined, _expect$toEqual37._submitting = false, _expect$toEqual37._submitFailed = false, _expect$toEqual37));
  });

  it('should unset asyncValidating on stopAsyncValidation', function () {
    var _foo17, _expect$toEqual38;

    var state = _reducer2['default']({
      foo: (_foo17 = {
        myField: {
          initial: 'initialValue',
          value: 'dirtyValue',
          touched: true
        },
        myOtherField: {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          touched: true
        },
        _active: undefined,
        _asyncValidating: true
      }, _foo17[_reducer.globalErrorKey] = undefined, _foo17._submitting = false, _foo17._submitFailed = false, _foo17)
    }, _extends({}, _actions.stopAsyncValidation({
      myField: 'Error about myField',
      myOtherField: 'Error about myOtherField'
    }), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual38 = {
      myField: {
        initial: 'initialValue',
        value: 'dirtyValue',
        touched: true,
        asyncError: 'Error about myField'
      },
      myOtherField: {
        initial: 'otherInitialValue',
        value: 'otherDirtyValue',
        touched: true,
        asyncError: 'Error about myOtherField'
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual38[_reducer.globalErrorKey] = undefined, _expect$toEqual38._submitting = false, _expect$toEqual38._submitFailed = false, _expect$toEqual38));
  });

  it('should unset field async errors on stopAsyncValidation', function () {
    var _foo18, _expect$toEqual39;

    var state = _reducer2['default']({
      foo: (_foo18 = {
        myField: {
          initial: 'initialValue',
          value: 'dirtyValue',
          asyncError: 'myFieldError',
          touched: true
        },
        myOtherField: {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          asyncError: 'myOtherFieldError',
          touched: true
        },
        _active: undefined,
        _asyncValidating: true
      }, _foo18[_reducer.globalErrorKey] = undefined, _foo18._submitting = false, _foo18._submitFailed = false, _foo18)
    }, _extends({}, _actions.stopAsyncValidation(), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual39 = {
      myField: {
        initial: 'initialValue',
        value: 'dirtyValue',
        touched: true
      },
      myOtherField: {
        initial: 'otherInitialValue',
        value: 'otherDirtyValue',
        touched: true
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual39[_reducer.globalErrorKey] = undefined, _expect$toEqual39._submitting = false, _expect$toEqual39._submitFailed = false, _expect$toEqual39));
  });

  it('should unset asyncValidating on stopAsyncValidation and set global error', function () {
    var _foo19, _stopAsyncValidation, _expect$toEqual40;

    var state = _reducer2['default']({
      foo: (_foo19 = {
        myField: {
          initial: 'initialValue',
          value: 'dirtyValue',
          touched: true
        },
        myOtherField: {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          touched: true
        },
        _active: undefined,
        _asyncValidating: true
      }, _foo19[_reducer.globalErrorKey] = undefined, _foo19._submitting = false, _foo19._submitFailed = false, _foo19)
    }, _extends({}, _actions.stopAsyncValidation((_stopAsyncValidation = {}, _stopAsyncValidation[_reducer.globalErrorKey] = 'This is a global error', _stopAsyncValidation)), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual40 = {
      myField: {
        initial: 'initialValue',
        value: 'dirtyValue',
        touched: true
      },
      myOtherField: {
        initial: 'otherInitialValue',
        value: 'otherDirtyValue',
        touched: true
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual40[_reducer.globalErrorKey] = 'This is a global error', _expect$toEqual40._submitting = false, _expect$toEqual40._submitFailed = false, _expect$toEqual40));
  });

  it('should unset submitting on stopSubmit', function () {
    var _foo20, _expect$toEqual41;

    var state = _reducer2['default']({
      foo: (_foo20 = {
        doesnt: 'matter',
        should: 'notchange',
        _active: undefined,
        _asyncValidating: false
      }, _foo20[_reducer.globalErrorKey] = undefined, _foo20._submitting = true, _foo20._submitFailed = false, _foo20)
    }, _extends({}, _actions.stopSubmit(), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual41 = {
      doesnt: 'matter',
      should: 'notchange',
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual41[_reducer.globalErrorKey] = undefined, _expect$toEqual41._submitting = false, _expect$toEqual41._submitFailed = false, _expect$toEqual41));
  });

  it('should set submitError on nested fields on stopSubmit', function () {
    var _foo21, _expect$toEqual42;

    var state = _reducer2['default']({
      foo: (_foo21 = {
        bar: {
          myField: {
            initial: 'initialValue',
            value: 'dirtyValue',
            touched: true
          },
          myOtherField: {
            initial: 'otherInitialValue',
            value: 'otherDirtyValue',
            touched: true
          }
        },
        _active: undefined,
        _asyncValidating: false
      }, _foo21[_reducer.globalErrorKey] = undefined, _foo21._submitting = true, _foo21._submitFailed = false, _foo21)
    }, _extends({}, _actions.stopSubmit({
      bar: {
        myField: 'Error about myField',
        myOtherField: 'Error about myOtherField'
      }
    }), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual42 = {
      bar: {
        myField: {
          initial: 'initialValue',
          value: 'dirtyValue',
          touched: true,
          submitError: 'Error about myField'
        },
        myOtherField: {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          touched: true,
          submitError: 'Error about myOtherField'
        }
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual42[_reducer.globalErrorKey] = undefined, _expect$toEqual42._submitting = false, _expect$toEqual42._submitFailed = true, _expect$toEqual42));
  });

  it('should set submitError on array fields on stopSubmit', function () {
    var _foo22, _expect$toEqual43;

    var state = _reducer2['default']({
      foo: (_foo22 = {
        bar: [{
          initial: 'initialValue',
          value: 'dirtyValue',
          touched: true
        }, {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          touched: true
        }],
        _active: undefined,
        _asyncValidating: false
      }, _foo22[_reducer.globalErrorKey] = undefined, _foo22._submitting = true, _foo22._submitFailed = false, _foo22)
    }, _extends({}, _actions.stopSubmit({
      bar: ['Error about myField', 'Error about myOtherField']
    }), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual43 = {
      bar: [{
        initial: 'initialValue',
        value: 'dirtyValue',
        touched: true,
        submitError: 'Error about myField'
      }, {
        initial: 'otherInitialValue',
        value: 'otherDirtyValue',
        touched: true,
        submitError: 'Error about myOtherField'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual43[_reducer.globalErrorKey] = undefined, _expect$toEqual43._submitting = false, _expect$toEqual43._submitFailed = true, _expect$toEqual43));
  });

  it('should unset submitFailed on stopSubmit with no errors', function () {
    var _foo23, _expect$toEqual44;

    var state = _reducer2['default']({
      foo: (_foo23 = {
        doesnt: 'matter',
        should: 'notchange',
        _active: undefined,
        _asyncValidating: false
      }, _foo23[_reducer.globalErrorKey] = undefined, _foo23._submitting = true, _foo23._submitFailed = true, _foo23)
    }, _extends({}, _actions.stopSubmit(), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual44 = {
      doesnt: 'matter',
      should: 'notchange',
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual44[_reducer.globalErrorKey] = undefined, _expect$toEqual44._submitting = false, _expect$toEqual44._submitFailed = false, _expect$toEqual44));
  });

  it('should unset submitting and set submit errors on stopSubmit', function () {
    var _foo24, _expect$toEqual45;

    var state = _reducer2['default']({
      foo: (_foo24 = {
        myField: {
          initial: 'initialValue',
          value: 'dirtyValue',
          touched: true
        },
        myOtherField: {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          touched: true
        },
        _active: undefined,
        _asyncValidating: false
      }, _foo24[_reducer.globalErrorKey] = undefined, _foo24._submitting = true, _foo24._submitFailed = false, _foo24)
    }, _extends({}, _actions.stopSubmit({
      myField: 'Error about myField',
      myOtherField: 'Error about myOtherField'
    }), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual45 = {
      myField: {
        initial: 'initialValue',
        value: 'dirtyValue',
        touched: true,
        submitError: 'Error about myField'
      },
      myOtherField: {
        initial: 'otherInitialValue',
        value: 'otherDirtyValue',
        touched: true,
        submitError: 'Error about myOtherField'
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual45[_reducer.globalErrorKey] = undefined, _expect$toEqual45._submitting = false, _expect$toEqual45._submitFailed = true, _expect$toEqual45));
  });

  it('should unset submitting and set submit global error on stopSubmit', function () {
    var _foo25, _stopSubmit, _expect$toEqual46;

    var state = _reducer2['default']({
      foo: (_foo25 = {
        myField: {
          initial: 'initialValue',
          value: 'dirtyValue',
          touched: true
        },
        myOtherField: {
          initial: 'otherInitialValue',
          value: 'otherDirtyValue',
          touched: true
        },
        _active: undefined,
        _asyncValidating: false
      }, _foo25[_reducer.globalErrorKey] = undefined, _foo25._submitting = true, _foo25._submitFailed = false, _foo25)
    }, _extends({}, _actions.stopSubmit((_stopSubmit = {}, _stopSubmit[_reducer.globalErrorKey] = 'This is a global error', _stopSubmit)), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual46 = {
      myField: {
        initial: 'initialValue',
        value: 'dirtyValue',
        touched: true
      },
      myOtherField: {
        initial: 'otherInitialValue',
        value: 'otherDirtyValue',
        touched: true
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual46[_reducer.globalErrorKey] = 'This is a global error', _expect$toEqual46._submitting = false, _expect$toEqual46._submitFailed = true, _expect$toEqual46));
  });

  it('should mark fields as touched on touch', function () {
    var _foo26, _expect$toEqual47;

    var state = _reducer2['default']({
      foo: (_foo26 = {
        myField: {
          value: 'initialValue',
          touched: false
        },
        myOtherField: {
          value: 'otherInitialValue',
          touched: false
        },
        _active: undefined,
        _asyncValidating: false
      }, _foo26[_reducer.globalErrorKey] = undefined, _foo26._submitting = false, _foo26._submitFailed = false, _foo26)
    }, _extends({}, _actions.touch('myField', 'myOtherField'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual47 = {
      myField: {
        value: 'initialValue',
        touched: true
      },
      myOtherField: {
        value: 'otherInitialValue',
        touched: true
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual47[_reducer.globalErrorKey] = undefined, _expect$toEqual47._submitting = false, _expect$toEqual47._submitFailed = false, _expect$toEqual47));
  });

  it('should mark deep fields as touched on touch', function () {
    var _foo27, _expect$toEqual48;

    var state = _reducer2['default']({
      foo: (_foo27 = {
        deep: {
          myField: {
            value: 'initialValue',
            touched: false
          },
          myOtherField: {
            value: 'otherInitialValue',
            touched: false
          }
        },
        _active: undefined,
        _asyncValidating: false
      }, _foo27[_reducer.globalErrorKey] = undefined, _foo27._submitting = false, _foo27._submitFailed = false, _foo27)
    }, _extends({}, _actions.touch('deep.myField', 'deep.myOtherField'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual48 = {
      deep: {
        myField: {
          value: 'initialValue',
          touched: true
        },
        myOtherField: {
          value: 'otherInitialValue',
          touched: true
        }
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual48[_reducer.globalErrorKey] = undefined, _expect$toEqual48._submitting = false, _expect$toEqual48._submitFailed = false, _expect$toEqual48));
  });

  it('should mark array fields as touched on touch', function () {
    var _foo28, _expect$toEqual49;

    var state = _reducer2['default']({
      foo: (_foo28 = {
        myFields: [{
          value: 'initialValue',
          touched: false
        }, {
          value: 'otherInitialValue',
          touched: false
        }],
        _active: undefined,
        _asyncValidating: false
      }, _foo28[_reducer.globalErrorKey] = undefined, _foo28._submitting = false, _foo28._submitFailed = false, _foo28)
    }, _extends({}, _actions.touch('myFields[0]', 'myFields[1]'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual49 = {
      myFields: [{
        value: 'initialValue',
        touched: true
      }, {
        value: 'otherInitialValue',
        touched: true
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual49[_reducer.globalErrorKey] = undefined, _expect$toEqual49._submitting = false, _expect$toEqual49._submitFailed = false, _expect$toEqual49));
  });

  it('should mark index-less array fields as touched on touch', function () {
    var _foo29, _expect$toEqual50;

    var state = _reducer2['default']({
      foo: (_foo29 = {
        myFields: [{
          value: 'initialValue',
          touched: false
        }, {
          value: 'otherInitialValue',
          touched: false
        }],
        _active: undefined,
        _asyncValidating: false
      }, _foo29[_reducer.globalErrorKey] = undefined, _foo29._submitting = false, _foo29._submitFailed = false, _foo29)
    }, _extends({}, _actions.touch('myFields[]'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual50 = {
      myFields: [{
        value: 'initialValue',
        touched: true
      }, {
        value: 'otherInitialValue',
        touched: true
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual50[_reducer.globalErrorKey] = undefined, _expect$toEqual50._submitting = false, _expect$toEqual50._submitFailed = false, _expect$toEqual50));
  });

  it('should mark index-less array subfields as touched on touch', function () {
    var _foo30, _expect$toEqual51;

    var state = _reducer2['default']({
      foo: (_foo30 = {
        myFields: [{
          name: {
            value: 'initialValue',
            touched: false
          }
        }, {
          name: {
            value: 'otherInitialValue',
            touched: false
          }
        }],
        _active: undefined,
        _asyncValidating: false
      }, _foo30[_reducer.globalErrorKey] = undefined, _foo30._submitting = false, _foo30._submitFailed = false, _foo30)
    }, _extends({}, _actions.touch('myFields[].name'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual51 = {
      myFields: [{
        name: {
          value: 'initialValue',
          touched: true
        }
      }, {
        name: {
          value: 'otherInitialValue',
          touched: true
        }
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual51[_reducer.globalErrorKey] = undefined, _expect$toEqual51._submitting = false, _expect$toEqual51._submitFailed = false, _expect$toEqual51));
  });

  it('should ignore empty index-less array fields on touch', function () {
    var _foo31, _expect$toEqual52;

    var state = _reducer2['default']({
      foo: (_foo31 = {
        _active: undefined,
        _asyncValidating: false
      }, _foo31[_reducer.globalErrorKey] = undefined, _foo31._submitting = false, _foo31._submitFailed = false, _foo31)
    }, _extends({}, _actions.touch('myFields[]'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual52 = {
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual52[_reducer.globalErrorKey] = undefined, _expect$toEqual52._submitting = false, _expect$toEqual52._submitFailed = false, _expect$toEqual52));
  });

  it('should ignore empty index-less array subfields on touch', function () {
    var _foo32, _expect$toEqual53;

    var state = _reducer2['default']({
      foo: (_foo32 = {
        _active: undefined,
        _asyncValidating: false
      }, _foo32[_reducer.globalErrorKey] = undefined, _foo32._submitting = false, _foo32._submitFailed = false, _foo32)
    }, _extends({}, _actions.touch('myFields[].name'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual53 = {
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual53[_reducer.globalErrorKey] = undefined, _expect$toEqual53._submitting = false, _expect$toEqual53._submitFailed = false, _expect$toEqual53));
  });

  it('should unmark fields as touched on untouch', function () {
    var _foo33, _expect$toEqual54;

    var state = _reducer2['default']({
      foo: (_foo33 = {
        myField: {
          value: 'initialValue',
          touched: true
        },
        myOtherField: {
          value: 'otherInitialValue',
          touched: true
        },
        _active: undefined,
        _asyncValidating: false
      }, _foo33[_reducer.globalErrorKey] = undefined, _foo33._submitting = false, _foo33._submitFailed = false, _foo33)
    }, _extends({}, _actions.untouch('myField', 'myOtherField'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual54 = {
      myField: {
        value: 'initialValue'
      },
      myOtherField: {
        value: 'otherInitialValue'
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual54[_reducer.globalErrorKey] = undefined, _expect$toEqual54._submitting = false, _expect$toEqual54._submitFailed = false, _expect$toEqual54));
  });

  it('should unmark deep fields as touched on untouch', function () {
    var _foo34, _expect$toEqual55;

    var state = _reducer2['default']({
      foo: (_foo34 = {
        deep: {
          myField: {
            value: 'initialValue',
            touched: true
          },
          myOtherField: {
            value: 'otherInitialValue',
            touched: true
          }
        },
        _active: undefined,
        _asyncValidating: false
      }, _foo34[_reducer.globalErrorKey] = undefined, _foo34._submitting = false, _foo34._submitFailed = false, _foo34)
    }, _extends({}, _actions.untouch('deep.myField', 'deep.myOtherField'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual55 = {
      deep: {
        myField: {
          value: 'initialValue'
        },
        myOtherField: {
          value: 'otherInitialValue'
        }
      },
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual55[_reducer.globalErrorKey] = undefined, _expect$toEqual55._submitting = false, _expect$toEqual55._submitFailed = false, _expect$toEqual55));
  });

  it('should unmark array fields as touched on untouch', function () {
    var _foo35, _expect$toEqual56;

    var state = _reducer2['default']({
      foo: (_foo35 = {
        myFields: [{
          value: 'initialValue',
          touched: true
        }, {
          value: 'otherInitialValue',
          touched: true
        }],
        _active: undefined,
        _asyncValidating: false
      }, _foo35[_reducer.globalErrorKey] = undefined, _foo35._submitting = false, _foo35._submitFailed = false, _foo35)
    }, _extends({}, _actions.untouch('myFields[0]', 'myFields[1]'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual56 = {
      myFields: [{
        value: 'initialValue'
      }, {
        value: 'otherInitialValue'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual56[_reducer.globalErrorKey] = undefined, _expect$toEqual56._submitting = false, _expect$toEqual56._submitFailed = false, _expect$toEqual56));
  });

  it('should mark index-less array fields as touched on touch', function () {
    var _foo36, _expect$toEqual57;

    var state = _reducer2['default']({
      foo: (_foo36 = {
        myFields: [{
          value: 'initialValue',
          touched: true
        }, {
          value: 'otherInitialValue',
          touched: true
        }],
        _active: undefined,
        _asyncValidating: false
      }, _foo36[_reducer.globalErrorKey] = undefined, _foo36._submitting = false, _foo36._submitFailed = false, _foo36)
    }, _extends({}, _actions.untouch('myFields[]'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual57 = {
      myFields: [{
        value: 'initialValue'
      }, {
        value: 'otherInitialValue'
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual57[_reducer.globalErrorKey] = undefined, _expect$toEqual57._submitting = false, _expect$toEqual57._submitFailed = false, _expect$toEqual57));
  });

  it('should mark index-less array subfields as touched on touch', function () {
    var _foo37, _expect$toEqual58;

    var state = _reducer2['default']({
      foo: (_foo37 = {
        myFields: [{
          name: {
            value: 'initialValue',
            touched: true
          }
        }, {
          name: {
            value: 'otherInitialValue',
            touched: true
          }
        }],
        _active: undefined,
        _asyncValidating: false
      }, _foo37[_reducer.globalErrorKey] = undefined, _foo37._submitting = false, _foo37._submitFailed = false, _foo37)
    }, _extends({}, _actions.untouch('myFields[].name'), {
      form: 'foo'
    }));
    _expect2['default'](state.foo).toEqual((_expect$toEqual58 = {
      myFields: [{
        name: {
          value: 'initialValue'
        }
      }, {
        name: {
          value: 'otherInitialValue'
        }
      }],
      _active: undefined,
      _asyncValidating: false
    }, _expect$toEqual58[_reducer.globalErrorKey] = undefined, _expect$toEqual58._submitting = false, _expect$toEqual58._submitFailed = false, _expect$toEqual58));
  });

  it('should destroy forms on destroy', function () {
    var _foo38, _bar, _bar2;

    var state = _reducer2['default']({
      foo: (_foo38 = {
        _active: undefined,
        _asyncValidating: false
      }, _foo38[_reducer.globalErrorKey] = undefined, _foo38._submitting = false, _foo38._submitFailed = false, _foo38),
      bar: (_bar = {
        _active: undefined,
        _asyncValidating: false
      }, _bar[_reducer.globalErrorKey] = undefined, _bar._submitting = false, _bar._submitFailed = false, _bar)
    }, _extends({}, _actions.destroy(), {
      form: 'foo'
    }));
    _expect2['default'](state).toEqual({
      bar: (_bar2 = {
        _active: undefined,
        _asyncValidating: false
      }, _bar2[_reducer.globalErrorKey] = undefined, _bar2._submitting = false, _bar2._submitFailed = false, _bar2)
    });
  });

  it('should destroy last form on destroy', function () {
    var _foo39;

    var state = _reducer2['default']({
      foo: (_foo39 = {
        _active: undefined,
        _asyncValidating: false
      }, _foo39[_reducer.globalErrorKey] = undefined, _foo39._submitting = false, _foo39._submitFailed = false, _foo39)
    }, _extends({}, _actions.destroy(), {
      form: 'foo'
    }));
    _expect2['default'](state).toEqual({});
  });

  it('should destroy form and formkey on destroy', function () {
    var _barKey, _bazKey, _bazKey2;

    var destroyWithKey = function destroyWithKey(key) {
      return _bindActionData2['default'](_actions.destroy, { key: key })();
    };
    var state = _reducer2['default']({
      fooForm: {
        barKey: (_barKey = {
          _active: undefined,
          _asyncValidating: false
        }, _barKey[_reducer.globalErrorKey] = undefined, _barKey._submitting = false, _barKey._submitFailed = false, _barKey),
        bazKey: (_bazKey = {
          _active: undefined,
          _asyncValidating: false
        }, _bazKey[_reducer.globalErrorKey] = undefined, _bazKey._submitting = false, _bazKey._submitFailed = false, _bazKey)
      }
    }, _extends({}, destroyWithKey('barKey'), {
      form: 'fooForm'
    }));
    _expect2['default'](state.fooForm).toEqual({
      bazKey: (_bazKey2 = {
        _active: undefined,
        _asyncValidating: false
      }, _bazKey2[_reducer.globalErrorKey] = undefined, _bazKey2._submitting = false, _bazKey2._submitFailed = false, _bazKey2)
    });
  });
});

describe('reducer.plugin', function () {
  it('should initialize form state when there is a reducer plugin', function () {
    var _expect$toExist$toBeA$toEqual2;

    var result = _reducer2['default'].plugin({
      foo: function foo(state) {
        return state;
      }
    })();
    _expect2['default'](result).toExist().toBeA('object');
    _expect2['default'](Object.keys(result).length).toBe(1);
    _expect2['default'](result.foo).toExist().toBeA('object').toEqual((_expect$toExist$toBeA$toEqual2 = {
      _active: undefined,
      _asyncValidating: false
    }, _expect$toExist$toBeA$toEqual2[_reducer.globalErrorKey] = undefined, _expect$toExist$toBeA$toEqual2._submitting = false, _expect$toExist$toBeA$toEqual2._submitFailed = false, _expect$toExist$toBeA$toEqual2));
  });
});

describe('reducer.normalize', function () {
  it('should initialize form state when there is a normalizer', function () {
    var _expect$toExist$toBeA$toEqual3;

    var state = _reducer2['default'].normalize({
      foo: {
        myField: function myField() {
          return 'normalized';
        }
      }
    })();
    _expect2['default'](state).toExist().toBeA('object');
    _expect2['default'](Object.keys(state).length).toBe(1);
    _expect2['default'](state.foo).toExist().toBeA('object').toEqual((_expect$toExist$toBeA$toEqual3 = {
      _active: undefined,
      _asyncValidating: false
    }, _expect$toExist$toBeA$toEqual3[_reducer.globalErrorKey] = undefined, _expect$toExist$toBeA$toEqual3._submitting = false, _expect$toExist$toBeA$toEqual3._submitFailed = false, _expect$toExist$toBeA$toEqual3.myField = {
      value: 'normalized'
    }, _expect$toExist$toBeA$toEqual3));
  });
  it('should normalize keyed forms depending on action form key', function () {
    var _defaultFields;

    var defaultFields = (_defaultFields = {
      _active: undefined,
      _asyncValidating: false
    }, _defaultFields[_reducer.globalErrorKey] = undefined, _defaultFields._submitting = false, _defaultFields._submitFailed = false, _defaultFields);
    var normalize = _reducer2['default'].normalize({
      foo: {
        myField: function myField() {
          return 'normalized';
        }
      }
    });
    var state = normalize({
      foo: {
        firstSubform: {}
      }
    }, {
      form: 'foo',
      key: 'firstSubform'
    });
    var nextState = normalize(state, {
      form: 'foo',
      key: 'secondSubForm'
    });
    _expect2['default'](state).toExist().toBeA('object');
    _expect2['default'](Object.keys(state).length).toBe(1);
    _expect2['default'](state.foo).toExist().toBeA('object').toEqual({
      firstSubform: _extends({}, defaultFields, {
        myField: {
          value: 'normalized'
        }
      })
    });
    _expect2['default'](nextState.foo).toEqual({
      firstSubform: _extends({}, defaultFields, {
        myField: {
          value: 'normalized'
        }
      }),
      secondSubForm: _extends({}, defaultFields, {
        myField: {
          value: 'normalized'
        }
      })
    });
  });
});